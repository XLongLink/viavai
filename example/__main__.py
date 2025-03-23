from example.app import ViavaiApp

if __name__ == '__main__':
    from viavai import Server
    server = Server(ViavaiApp)
    server.run()