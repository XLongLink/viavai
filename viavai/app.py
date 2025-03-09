class Page:
    pass 


class Navbar:
    pass


class App:
    """Root class of a viavai application.

    An instance of this class is created every time an user connects to the server
    """
    _logo = None
    _title = None
    _subtitle = None
    _navbar: Navbar = None
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
        obj = {
            "logo": "/images/logo.svg",
            "title": "Acme Inc.",
            "subtitle": "Admin Portal",
            "header": [
            {
                "name": 'Main',
                "type": 'default',
                "items": [
                {
                    "icon": 'home',
                    "name": 'Home',
                },
                {
                    "icon": 'settings',
                    "name": 'Settings',
                },
                ],
            },
            {
                "name": 'Team',
                "type": 'plus',
                "items": [
                {
                    "icon": 'bot',
                    "name": 'Example',
                },
                {
                    "icon": 'home',
                    "name": 'Home',
                }
                ],
            },
            ]
        }
        return obj
    
    def _event(self, message: dict) -> None:
        """Handle the forwarding of the events"""
        page = self._pages[0]
        page._event(message)

