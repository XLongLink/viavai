from example.pages import Initiation, Planning, Execution, Project, Home
from example.database import projects
from viavai import App


class ViavaiApp(App):
    logo = "/test/logo.svg"
    title = "Acme Inc."
    subtitle = "Admin Portal"
    
    def __init__(self):
        # Register the pages
        self.add_page(Project)
        self.add_page(Planning)
        self.add_page(Initiation)
        self.add_page(Execution)
        self.add_page(Home)

        section = self.add_section("Example")
        section.add_item("Home", icon="home", href="/")

        # Create navbar section for active projects
        section = self.add_section("Projects", "plus")

        # Create navbar items for each active project
        for project in projects:
            if project['status'] == 'inactive':
                continue
            item = section.add_item(f"{project['name']}", icon=project['icon'], href=f"/projects/{project['id']}")
            item.add_subitem("Initiation", href=f"/projects/{project['id']}/initiation")
            item.add_subitem("Planning", href=f"/projects/{project['id']}/planning")
            item.add_subitem("Execution", href=f"/projects/{project['id']}/execution")

        # Create navbar section for archived projects
        section = self.add_section("Archive", "collapse")

        # Create navbar items for each archived project
        for project in projects:
            if project['status'] == 'active':
                continue
            item = section.add_item(f"{project['name']}", icon=project['icon'], href=f"/projects/{project['id']}")
            item.add_subitem("Initiation", href=f"/projects/{project['id']}/initiation")
            item.add_subitem("Planning", href=f"/projects/{project['id']}/planning")
            item.add_subitem("Execution", href=f"/projects/{project['id']}/execution")
