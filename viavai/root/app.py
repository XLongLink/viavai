from ..nav import Section
from .base import Base
from .page import Page, Page404
from ..decorators import get_class


class App(Base):
    """Root class of a viavai application.

    An instance of this class is created every time an user connects to the server
    """
    logo: str = "/images/logo.svg"
    title: str = "ViaVai"
    subtitle: str = "a LongLink product"

    # Navbar (this is constant across the application)
    _nav: list[Section]

    # Pages active and list of all pages
    _page: Page
    _pages: list[Page]

    def add_section(self, name: str, variant: str = "default") -> Section:
        """Add a new section to the navbar"""
        section = Section(name=name, variant=variant)
        self._nav.append(section)
        return section

    def add_page(self, page: Page):
        """Add a new page to the list of pages"""
        self._pages.append(page)
        
    def _render(self) -> dict:
        """Render the app, return the Json structure"""
        return {
            "app": {
                "logo": self.logo,
                "title": self.title,
                "subtitle": self.subtitle
            }, 
            "page":{
                "logo": self._page.logo,
                "title": self._page.title
            },
            "nav": [section._render() for section in self._nav],
            "main": self._page._render()
        }

    def _event(self, message: dict) -> None:
        """Handle the forwarding of the events"""
        if href := message.get('href'):
            if page := get_class(href):
                self._page = page
                return
            self._page = Page404()
            return

