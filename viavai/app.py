from pydantic import BaseModel
from typing import Literal


class Page:
    # breadcrumb
    # title
    pass


class Item(BaseModel):
    icon: str
    name: str


class Section(BaseModel):
    name: str
    items: list[Item] = []
    variant: Literal['default', 'plus', 'collapse'] = 'default'

    def add_item(self, name: str, *, icon: str = None,  path=None) -> Item:
        item = Item(icon=icon, name=name)
        self.items.append(item)
        return item


class State(BaseModel):
    """Is the object that is sent to the user to render the page
    This object has to be in sync from the backend to the frontend
    """
    logo: str             # URL to the Logo 
    title: str            # Title of the application
    subtitle: str         # Subtitle of the application (if any)

    nav: list[Section] # List of sections in the header
    # main: list[Section] # The main content  
    # TODO: Maybe a modal here? -> like the current open modal.


class App:
    """Root class of a viavai application.

    An instance of this class is created every time an user connects to the server
    """
    logo: str = "/images/logo.svg"
    title: str = "ViaVai"
    subtitle: str = "a LongLink product"

    nav: list[Section]

    def __init__(self):
        self.nav = []

    def __init_subclass__(cls, **kwargs):
        """Ensure that the class has a list of pages and a navbar"""
        original_init = cls.__init__

        def new_init(self: "App", *args, **kwargs):
            self.nav = []
            original_init(self, *args, **kwargs)

        cls.__init__ = new_init

    def add_section(self, name: str, variant: str = "default") -> Section:
        """Add a new section to the navbar"""
        section = Section(name=name, variant=variant)
        self.nav.append(section)
        return section

    def _render(self) -> State:
        """Render the app, return the Json structure"""
        return State(
            logo=self.logo,
            title=self.title,
            subtitle=self.subtitle,
            nav=self.nav,
        )

    def _event(self, message: dict) -> None:
        """Handle the forwarding of the events"""
        print(message)
