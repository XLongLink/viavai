from .nav import Section
from .page import Page, Page404
from .decorators import get_class


class App:
    """Root class of a viavai application.

    An instance of this class is created every time an user connects to the server
    """
    logo: str = "/images/logo.svg"
    title: str = "ViaVai"
    subtitle: str = "a LongLink product"

    nav: list[Section]  # List of sections in the header
    page: Page          # The current page   
    pages: list[Page]   # List of all pages

    def __init__(self):
        self.nav = []
    
    def __init_subclass__(cls, **kwargs):
        """Ensure that the class has a list of pages and a navbar"""
        original_init = cls.__init__

        def new_init(self: "App", *args, **kwargs):
            self.nav = []
            self.page = Page()

            original_init(self, *args, **kwargs)

        cls.__init__ = new_init

    def add_section(self, name: str, variant: str = "default") -> Section:
        """Add a new section to the navbar"""
        section = Section(name=name, variant=variant)
        self.nav.append(section)
        return section

    def add_page(self, page: Page) -> None:
        """Add a new page to the list of pages"""
        self.pages.append(page)
        
    def _render(self) -> dict:
        """Render the app, return the Json structure"""
        return {
            "logo": self.logo,
            "title": self.title,
            "subtitle": self.subtitle,
            "nav": [section._render() for section in self.nav],
            "main": self.page._render()
        }

    def _event(self, message: dict) -> None:
        """Handle the forwarding of the events"""
        if href := message.get('href'):
            if page := get_class(href):
                self.page = page
            self.page = Page404()
    
        print(message)
