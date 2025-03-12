from viavai import App

# TODO: Add a sub-section to the navbar -> project -> tasks
# TODO: Add action for the plus button -> modal? popup?

class ViavaiApp(App):
    logo = "/images/logo.svg"
    title = "Acme Inc."
    subtitle = "Admin Portal"
    
    def __init__(self):
        # Create navbar section for active projects
        section = self.add_section("Projects", "plus")
        section.add_item("000 Cureggia", icon="house", path="/projects/000-cureggia")
        section.add_item("001 Paradiso", icon="clipboard-list", path="/projects/001-paradiso")
        section.add_item("002 Brè", icon="folder-open-dot", path="/projects/002-bre")

        # Create navbar section for archived projects
        section = self.add_section("Archive", "collapse")
        section.add_item("201 Valcolla", icon="home", path="/archive/201-valcolla")
        section.add_item("202 Viganello", icon="home", path="/archive/202-viganello")


if __name__ == '__main__':
    from viavai import Server
    server = Server(ViavaiApp)
    server.run()