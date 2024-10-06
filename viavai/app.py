from .page import Page


class App:
    """
        Root class of a viavai application.
        An instance of this class is created every time an user connects to the server.
    """

    _pages: list[Page] = []

    def __init_subclass__(cls, **kwargs):
        """Ensure that the class has a list of pages"""
        original_init = cls.__init__

        def new_init(self: "App", *args, **kwargs):
            self._pages = []
            original_init(self, *args, **kwargs)

        cls.__init__ = new_init
        
    def add_page(self, page: Page) -> None:
        """Add a page to the app"""
        self._pages.append(page)

    def _render(self) -> dict:
        """Render the app, return the Json structure"""
        obj = {}
        if self._pages:
            obj["main"] = self._pages[0]._render()
        return obj
    
    def _event(self, message: dict) -> None:
        """Handle the forwarding of the events"""
        page = self._pages[0]
        page._event(message)

