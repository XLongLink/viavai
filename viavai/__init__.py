from .app import App
from .server import Server

server = Server(App)
server.run()