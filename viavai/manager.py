import json
import uuid
import asyncio
from fastapi import WebSocket
from .root.app import App
from .context import context, UserContext
asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())


class ConnectionManager:
    """Store all active connections and handle the communication between them
    TODO: Implement a token cache to store the app state for each connection
    TODO: Implement a room system to allow multiple users to interact with the same app
    """

    def __init__(self, app: App):
        self._app = app
        self._apps: dict[str, App] = {}
        self._connections: dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, *, token: str | None = None) -> str:
        """Connect a new client and return the connection ID"""
        await websocket.accept()

        # NOTE: For now, we generate a new connection ID for each connection
        connection_id = str(uuid.uuid4())

        # Create the user context for the current connection
        user_context = UserContext(connection_id)
        context.__var__.set(user_context)

        # Initialize the App for the current connection
        # The initialization is done on a separate thread in case of heavy computation
        app = await asyncio.to_thread(lambda: self._app())
        self._apps[connection_id] = app

        # Send to the user the first render of the app
        # NOTE: The render should be fast and not block the event loop
        obj = self._apps[connection_id]._render()
        print(json.dumps(obj, indent=2))
        await websocket.send_text(json.dumps(obj))

        # Save the connection and return the ID
        self._connections[connection_id] = websocket
        return connection_id

    def disconnect(self, connection_id: str):
        """Disconnect a connection by its ID"""
        # TODO: Save the app given the connection ID
        del self._apps[connection_id]
        del self._connections[connection_id]

    # async def broadcast(self, message: str):
    #     """Broadcast a message to all active connections"""
    #     for connection in self._connections.values():
    #         await connection.send_text(message)

    async def message(self, connection_id: str, message: str):
        """Send a message to a specific connection"""

        # When a message arrives, can be included
        # An update to the app state
        # A user interaction
        def handle_message(message: str, app: App):
            message = json.loads(message)
            app._event(message)
            return app._render()

        app = self._apps[connection_id]
        response = await asyncio.to_thread(handle_message, message, app)
        await self._connections[connection_id].send_text(json.dumps(response))
