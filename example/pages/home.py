from viavai import Page, url
from viavai.ui import Button

@url("/")
class Home(Page):
    title = "Home"

    def __init__(self):
        self.add_breadcrumb(f"Home", f"/")
        self.add_component(Button("Click me"))
        self.add_component(Button("Click me too"))