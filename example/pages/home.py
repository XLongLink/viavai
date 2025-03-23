from viavai import Page, url

@url("/")
class Home(Page):
    title = "Home"

    def __init__(self):
        self.add_breadcrumb(f"Home", f"/")
