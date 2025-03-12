from viavai import App

def url(path):
    def decorator(cls):
        cls.path = path
        return cls
    return decorator

@url("/")
class Page:
    icon = "home"   # Page icon
    title = "Home"  # Page title
    breadcrumb = ["item 1", "item 2"]  # Breadcrumb

    def __init__(self):
        self.add_
        pass


class ViavaiApp(App):
    logo = "/images/logo.svg"
    title = "Acme Inc."
    subtitle = "Admin Portal"
    
    def __init__(self):
        # Create navbar
        section = self.add_section("Main", "plus")
        section.add_item("home", "Home", path="/")
        section.add_item("settings", "Settings")

        section = self.add_section("Team", "plus")
        section.add_item("bot", "Example")


if __name__ == '__main__':
    from viavai import Server
    server = Server(ViavaiApp)
    server.run()