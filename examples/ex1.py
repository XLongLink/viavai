from viavai import App


class ViavaiApp(App):
    logo = "/images/logo.svg"
    title = "Acme Inc."
    subtitle = "Admin Portal"
    
    def __init__(self):
        section = self.add_section("Main", "default")
        section.add_item("home", "Home")
        section.add_item("settings", "Settings")
        section = self.add_section("Team", "plus")
        section.add_item("bot", "Example")


if __name__ == '__main__':
    from viavai import Server
    server = Server(ViavaiApp)
    server.run()