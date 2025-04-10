from viavai import Sidebar


class MySidebar(Sidebar):
    def __init__(self):
        section = self.add_section("Examples")
        section.add_item("Home", icon="home", href="/")
        section.add_item("Table", icon="table", href="/table")
        section.add_item("Dashboard", icon="layout-dashboard", href="/dashboard")

        section = self.add_section("Components", variant="collapse")
        section.add_item("Text", icon="puzzle", href="/ui/button")
        section.add_item("Button", icon="puzzle", href="/ui/card")
        section.add_item("Card", icon="layers", href="/ui/table")

        # Database
        
        for i in range(1, 6):
            section.add_item(f"Item {i}", icon="puzzle", href="/ui/card")