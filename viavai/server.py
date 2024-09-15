import os
import uvicorn
from datetime import datetime
from fastapi import FastAPI, Request, Query
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.websockets import WebSocket, WebSocketDisconnect
from jinja2 import Environment, FileSystemLoader

from .app import App
from .manager import ConnectionManager


class Server:
    """Handle the server logic for all the users of the app"""
    
    def __init__(self, app: App, *, development: bool = False):
        """Initialize the server with the app instance"""

        self._host = None
        self._port = None
        self._dev = development

        self._api = FastAPI()
        self._manager = ConnectionManager(app)

        # Since is server as a library, get the path where the current file is saved
        dir_current = os.path.dirname(os.path.abspath(__file__))
        self._static = os.path.join(dir_current, 'static')
        
        # Load the template engine
        self._templates = Environment(loader=FileSystemLoader(self._static))

        # Register routes and handlers
        self._api.get('/')(self.get_index)
        self._api.get('/static/bundle.js')(self.get_bundle)
        self._api.get('/static/tailwind.css')(self.get_tailwind)
        self._api.get('/static/libs/{library}')(self.get_library)
        self._api.get('/static/ui/{component}')(self.get_ui)
        self._api.get('/get-component')(self.get_component)
        # TODO: Add a route for the components
        # TODO: Add a route for the plots
        # TODO: Add a route for the maps
        # TODO: Add a 404 route

        # Registe the websocket endpoint
        self._api.websocket('/ws')(self.websocket_endpoint)

    async def get_component(self, request: Request):
        """Return a specific component"""
        return {'component': "test"}

    async def get_index(self, request: Request):
        """Render the index.html file, with the right data injected"""
        # TODO: Add a set-title method to the server
        # TODO: Add a set-icon method to the server
        # TODO: Stylesheet

        template = self._templates.get_template('index.html')

        # Create the script for the libraries
        # React must be loaded before react-dom
        libs = []
        for lib in os.listdir(os.path.join(self._static, 'libs'))[::-1]:
            if lib.endswith('.js'):
                libs.append(f'<script src="static/libs/{lib}"></script>')

        content = template.render(
            TITLE='ViaVai',
            LIBRARIES='\n\t'.join(libs),
            SERVER=f'{self._host}:{self._port}',
            CACHE=datetime.now().timestamp() if self._dev else 0
        )

        return HTMLResponse(content)
    
    async def get_bundle(self, request: Request):
        """Return the bundle.js file - Contains the main React logic"""
        dir_current = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(dir_current, 'static', 'bundle.js')
        return FileResponse(path=file_path, media_type='application/javascript')

    async def get_tailwind(self, request: Request):
        """Return the tailwind.css file - Contains the tailwindcss styles"""
        dir_current = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(dir_current, 'static', 'tailwind.css')
        return FileResponse(path=file_path, media_type='text/css')
    
    async def get_library(self, request: Request, library: str):
        """Return a specific library"""
        dir_current = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(dir_current, 'static', 'libs', library)
        return FileResponse(path=file_path, media_type='application/javascript')

    async def get_ui(self, request: Request, component: str):
        """Return a specific static file"""
        dir_current = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(dir_current, 'static', 'ui', component)
        return FileResponse(path=file_path, media_type='application/javascript')
                
    async def websocket_endpoint(self, websocket: WebSocket, token: str | None = Query(None)):
        conn_id = await self._manager.connect(websocket, token=token)

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