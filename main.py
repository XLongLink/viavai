from viavai import App, Server

server = Server(App, development=True)
server.run()