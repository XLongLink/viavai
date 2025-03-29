from viavai import Server, Page, Sidebar, state
from example.pages import Initiation, Planning, Execution, Project, Home

class MySidebar(Sidebar):
    def __init__(self):
        section = self.add_section("Example")
        section.add_item("Home", icon="home", href="/")

        section = self.add_section("Projects", "plus")
        item = section.add_item("Project", icon="project", href="/project")
        item.add_subitem("Initiation", href="/project/initiation")
        item.add_subitem("Planning", href="/project/planning")
        item.add_subitem("Execution", href="/project/execution")


server = Server()
server.register(MySidebar)
server.register(Initiation)
server.register(Planning)
server.register(Execution)
server.register(Project)
server.register(Home)
