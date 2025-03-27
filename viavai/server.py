import os
import json
import uuid
import asyncio
from starlette.routing import WebSocketRoute
from starlette.websockets import WebSocket, WebSocketDisconnect
from starlette.staticfiles import StaticFiles
from starlette.applications import Starlette
from .context import context, UserContext
from .decorators import get_class
asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
from .ui import Page, Sidebar


class Server(Starlette):
    class App:
        _page: Page = Page()
        _pages: list[Page] = []
        _side: Sidebar = Sidebar

        def __init__(self):
            self._side = self.__class__._side()

        def _render(self) -> dict:
            return {
                "page": self._page._render(),
                "sidebar": self._side._render()
            }

        def _event(self, message):
            print(message)
            pass

    def __init__(self):
        self._apps: dict[str, Server.App] = {}
        self._connections: dict[str, WebSocket] = {}

        # Determine the static files directory
        dir_current = os.path.dirname(os.path.abspath(__file__))
        dir_static = os.path.join(dir_current, "static")

        # Define the WebSocket route
        routes = [
            WebSocketRoute("/ws", self.websocket),
        ]
        super().__init__(routes=routes)

        # Mount static files
        self.mount("/", StaticFiles(directory=dir_static, html=True), name="static")

    def register(self, element: type[Page] | type[Sidebar]):
        if issubclass(element, Page) and type(element) == type:
            self.App._pages.append(element)
        if issubclass(element, Sidebar) and type(element) == type:
            self.App._side = element

    async def websocket(self, websocket: WebSocket):
        await websocket.accept()
        connection_id = str(uuid.uuid4())

        # Create the user context for the current connection
        user_context = UserContext(connection_id)
        context.__var__.set(user_context)

        # Initialize the App for the current connection
        # The initialization is done on a separate thread in case of heavy computation
        app = await asyncio.to_thread(lambda: self.App())
        self._apps[connection_id] = app

        # Send to the user the first render of the app
        # NOTE: The render should be fast and not block the event loop
        obj = self._apps[connection_id]._render()
        print(json.dumps(obj, indent=2))
        await websocket.send_text(json.dumps(obj))

        # Save the connection and return the ID
        self._connections[connection_id] = websocket
    
        try:
            while True:
                data = await websocket.receive_text()
                message = json.loads(data)

                app = self._apps[connection_id]
                obj = await asyncio.to_thread(self.handle_message, message, app)
                print(json.dumps(obj, indent=2))
                await self._connections[connection_id].send_text(json.dumps(obj))

        except WebSocketDisconnect:
            del self._apps[connection_id]
            del self._connections[connection_id]

    async def handle_message(self, message: str, app: App):
        """Send a message to a specific connection"""
        app._event(message)
        return app._render()
