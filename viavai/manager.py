import json
import uuid
import asyncio
from fastapi import WebSocket
from .context import state, UserContext
from .api import get_class
from .server import Server
asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())


class ConnectionManager:
    """Store all active connections and handle the communication between them
    TODO: Implement a token cache to store the app state for each connection
    TODO: Implement a room system to allow multiple users to interact with the same app
    """

    def __init__(self, app: Server.App):
        self._app = app
        self._apps: dict[str, Server.App] = {}
        self._connections: dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket) -> str:
        """Connect a new client and return the connection ID"""
        await websocket.accept()

        # NOTE: For now, we generate a new connection ID for each connection
        connection_id = str(uuid.uuid4())

        # Create the user context for the current connection
        user_context = UserContext(connection_id)
        state.__var__.set(user_context)

        # Initialize the App for the current connection
        # The initialization is done on a separate thread in case of heavy computation
        app: Server.App = await asyncio.to_thread(lambda: self._app())

        # If an initial page is defined, set it
        if page := get_class("/"):
            app._page = page
        
        self._apps[connection_id] = app

        # Send to the user the first render of the app
        # NOTE: The render should be fast and not block the event loop
        obj = self._apps[connection_id]._render()
        await websocket.send_text(json.dumps(obj))

        # Save the connection and return the ID
        self._connections[connection_id] = websocket
        return connection_id

    def disconnect(self, connection_id: str):
        """Disconnect a connection by its ID"""
        del self._apps[connection_id]
        del self._connections[connection_id]

    async def message(self, connection_id: str, message: str):
        """Send a message to a specific connection"""

        # When a message arrives, can be included
        # An update to the app state
        # A user interaction
        def handle_message(message: str, app: Server.App):
            message = json.loads(message)
            app._event(message)
            return app._render()

        app = self._apps[connection_id]
        response = await asyncio.to_thread(handle_message, message, app)
        print(json.dumps(response, indent=2))
        await self._connections[connection_id].send_text(json.dumps(response))
