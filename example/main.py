from viavai import Server, Page, Sidebar, state
from viavai.ui import Button, Text, Card
from viavai.api import url

class MyCard(Card):
    def __init__(self, title, description):
        super().__init__(title, description, variant="solid")
        self.add(Text("Card content"))

        self.btn = Button("Click me!")
        self.btn.on_click(self.handle_click)
        self.add(self.btn)
    
    def handle_click(self, event):
        print("Button clicked!")
        self.btn.set_text("Clicked!")


@url("/")
class MyPage(Page):
    title = "My Page"
    icon = "home"

    def __init__(self):
        self.add_breadcrumb("Home", href="/")
        self.add_breadcrumb("My Page", href="/my-page")

        for i in range(5):
            card = MyCard(f"Card {i+1}", f"This is the description for card {i+1}.")
            self.add(card)


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