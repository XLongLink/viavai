import os
import uvicorn
from fastapi import FastAPI, Request, Query
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.websockets import WebSocket, WebSocketDisconnect
from jinja2 import Environment, FileSystemLoader
from .app import App
from .manager import ConnectionManager


class Server:
    """Handle the server logic for all the users of the app"""
    
    def __init__(self, app: App):
        """Initialize the server with the app instance
        - If the app is a class instance, than the applications is a local application 
        --> One user and open in a window
        - If the app is a class definition, than the application is a web application 
        --> Multiple users
        """
        self._host = 'localhost'
        self._port = 8000

        # import webview
        # webview.create_window('Hello world', 'https://pywebview.flowrl.com/')
        # webview.start()
        self._api = FastAPI()
        self._manager = ConnectionManager(app)

        # Since is server as a library, get the path where the current file is saved
        dir_current = os.path.dirname(os.path.abspath(__file__))
        dir_static = os.path.join(dir_current, 'static')
        
        # Load the template engine
        self._templates = Environment(loader=FileSystemLoader(dir_static))

        # Register routes and handlers
        self._api.get('/')(self.get_index)
        self._api.get('/static/bundle.js')(self.get_bundle)
        self._api.get('/static/libs/{library}')(self.get_library)
        # TODO: Add a route for the components
        # TODO: Add a route for the plots
        # TODO: Add a route for the maps
        # TODO: Add a route the libraries

        # Registe the websocket endpoint
        self._api.websocket('/ws')(self.websocket_endpoint)

    async def get_index(self, request: Request):
        # TODO: Add the libraries to the template
        template = self._templates.get_template('index.html')
        content = template.render(SERVER_URL=f'ws://{self._host}:{self._port}/ws')
        return HTMLResponse(content)
    
    async def get_bundle(self, request: Request):
        dir_current = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(dir_current, 'static', 'bundle.js')
        return FileResponse(path=file_path, media_type='application/javascript')
    
    async def get_library(self, request: Request, library: str):
        dir_current = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(dir_current, 'static', 'libs', library)
        return FileResponse(path=file_path, media_type='application/javascript')
                            

    async def websocket_endpoint(self, websocket: WebSocket, token: str | None = Query(None)):
        conn_id = await self._manager.connect(websocket, token=token)

        # Keep the connection alive and handle incoming messages
        try:
            while True:
                data = await websocket.receive_text()
                await self._manager.message(conn_id, data)
        except WebSocketDisconnect:
            self._manager.disconnect(conn_id)

    def run(self, *, host: str = 'localhost', port: int = 8000):
        """Run the server using uvicorn"""
        self._host = host
        self._port = port
        uvicorn.run(self._api, host=host, port=port)