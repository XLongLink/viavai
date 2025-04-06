from viavai import Server, Page, Sidebar, state
from viavai.ui import Button, Text


class MyPage(Page):
    title = "My Page"
    icon = "home"

    def __init__(self):
        self.add_breadcrumb("Home", href="/")
        self.add_breadcrumb("My Page", href="/my-page")

        btn = Button("Click me!")
        btn.on_click(self.handle_click)
        self.add(btn)

        txt = Text("Hello world twice!")
        txt.size = "9xl"
        self.add(txt)
        
    def handle_click(self, event):
        print("Button clicked!")


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
server.register(MyPage)