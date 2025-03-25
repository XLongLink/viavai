import os
import uvicorn
from fastapi import FastAPI, Query
from fastapi.staticfiles import StaticFiles
from fastapi.websockets import WebSocket, WebSocketDisconnect

from .app import App
from .manager import ConnectionManager


class Server(FastAPI):
    """"""
    
    def __init__(self, app: App):
        """Initialize the server with the app instance"""
        super().__init__()

        self._manager = ConnectionManager(app)

        # Since is server as a library, get the path where the current file is saved
        dir_current = os.path.dirname(os.path.abspath(__file__))
        dir_static = os.path.join(dir_current, "static")

        # Register the websocket endpoint
        self.websocket('/ws')(self.websocket_endpoint)
        self.mount("/", StaticFiles(directory=dir_static, html=True), name="static")
        
    async def websocket_endpoint(self, websocket: WebSocket, token: str | None = Query(None)):
        conn_id = await self._manager.connect(websocket, token=token)
        try:
            while True:
                data = await websocket.receive_text()
                await self._manager.message(conn_id, data)
        except WebSocketDisconnect:
            self._manager.disconnect(conn_id)
