from .app import App
from .server import Server

if __name__ == '__main__':
    server = Server(App)
    server.run()
