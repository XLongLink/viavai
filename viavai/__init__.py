from .app import App
from .page import Page
from .server import Server


def run(title: str, logo: str, pages: list[Page]):
    pass


# Static pages
@url("/static")
class Page:
    pass


# Dynamic pages
@url("/page/<name>")
class Page:
    pass


if __name__ == '__main__':
    app = App()
    page = Page()
    server = Server(app)
    server.run()
