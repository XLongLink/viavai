import json
import uuid
from fastapi import WebSocket
from .app import App


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
        connection_id = str(uuid.uuid4())

        # TODO: If a token if provided, then load the app from the token cache

        # Create a new app for the connection
        if isinstance(self._app, App):
            self._apps[connection_id] = self._app
        else:
            self._apps[connection_id] = self._app()

        # Render the app and send it to the client
        try:
            obj = self._apps[connection_id].json()
            await websocket.send_text(json.dumps(obj))
        except Exception as e:
            await websocket.send_text(str(e))

        # Save the connection and return the ID
        self._connections[connection_id] = websocket
        return connection_id

    def disconnect(self, connection_id: str):
        """Disconnect a connection by its ID"""
        # TODO: Save the app given the connection ID
        del self._apps[connection_id]
        del self._connections[connection_id]

    async def broadcast(self, message: str):
        """Broadcast a message to all active connections"""
        for connection in self._connections.values():
            await connection.send_text(message)

    async def message(self, connection_id: str, message: str):
        """Send a message to a specific connection"""
        self._apps[connection_id].handle_event(message)
        # await self._connections[connection_id].send_text(message)