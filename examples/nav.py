from viavai import App

# TODO: Add a sub-section to the navbar -> project -> tasks
# TODO: Add action for the plus button -> modal? popup?

class ViavaiApp(App):
    logo = "/images/logo.svg"
    title = "Acme Inc."
    subtitle = "Admin Portal"
    
    def __init__(self):
        # This is an example of a static navbar. 
        # Another example is to fetch data from a database and then dynamically create the navbar
        
        # Create navbar section for active projects
        section = self.add_section("Projects", "plus")
        item = section.add_item("000 NewYork", icon="house", href="/projects/000")
        item.add_subitem("Initiation", href="/projects/000/initiation")
        item.add_subitem("Planning", href="/projects/000/planning")
        item.add_subitem("Execution", href="/projects/000/execution")
        
        item = section.add_item("001 London", icon="clipboard-list", href="/projects/001")
        item = section.add_item("002 Zurich", icon="folder-open-dot", href="/projects/002")
        item.add_subitem("Initiation", href="/projects/002/initiation")
        item.add_subitem("Planning", href="/projects/002/planning")
        item.add_subitem("Execution", href="/projects/002/execution")
        
        # Create navbar section for archived projects
        section = self.add_section("Archive", "collapse")
        section.add_item("201 Paris", icon="home", href="/archive/201")
        section.add_item("202 Berlin", icon="home", href="/archive/202")


if __name__ == '__main__':
    from viavai import Server
    server = Server(ViavaiApp)
    server.run()