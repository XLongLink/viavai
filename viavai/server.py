import os
import json
import uuid
import sys
import asyncio

if sys.platform.startswith("win"):
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

import logging
from starlette.routing import WebSocketRoute
from starlette.websockets import WebSocket, WebSocketDisconnect
from starlette.staticfiles import StaticFiles
from starlette.applications import Starlette
from .context import state, UserContext
from .ui import Sidebar, Text
from .page import Page



class PageNotFound(Page):
    title = "404 - Page Not Found"
    icon = "home"

    def __init__(self):
        txt = Text("The page you are looking for does not exist.", variant="title", size="3xl")
        self.add(txt)


logger = logging.getLogger("server")

class Server(Starlette):
    class App:
        """A ViaVai Application handle multiple pages and a single sidebar"""

        _page: Page
        _pages: list[Page] = []
        _side: Sidebar = Sidebar

        def __init__(self):
            self._side = self.__class__._side()
            self._page = self.__class__._pages[0]()

        def __render__(self) -> dict:
            return {
                "page": self._page.__render__(),
                "sidebar": self._side.__render__()
            }

        def __event__(self, message: dict):
            """Handle a message from the client"""
            if href := message.get("href"):
                # If the message is a page change, update the page
                if href != self._page.__url__:
                    href = href["href"]
                    for page in self.__class__._pages:
                        if match := page.__url__.match(href):
                            self._page = page(**match.groupdict())
                            break
                    else:
                        self._page = PageNotFound()

            for key, value in message.items():
                state.call_event(key, **value)

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
        print(websocket)
        await websocket.accept()
        connection_id = str(uuid.uuid4())

        # Create the user context for the current connection
        user_context = UserContext(connection_id)
        state.__var__.set(user_context)

        # Initialize the App for the current connection
        # The initialization is done on a separate thread in case of heavy computation
        
        app = await asyncio.to_thread(lambda: self.App())
        self._apps[connection_id] = app

        # Save the connection and return the ID
        self._connections[connection_id] = websocket
    
        try:
            while True:
                data = await websocket.receive_text()
                message = json.loads(data)
                app = self._apps[connection_id]
                obj = await asyncio.to_thread(self.handle_message, message, app)
                # print(json.dumps(obj, indent=2))
                await self._connections[connection_id].send_text(json.dumps(obj))

        except (WebSocketDisconnect, ConnectionResetError, asyncio.CancelledError) as e:
            logger.info(f"Connection closed: {connection_id} ({type(e).__name__})")

        except Exception as e:
            logger.exception(f"Unhandled exception in websocket connection: {connection_id}")

        finally:
            self._apps.pop(connection_id, None)
            self._connections.pop(connection_id, None)

    def handle_message(self, message: str, app: App):
        """Send a message to a specific connection"""
        app.__event__(message)
        return app.__render__()
