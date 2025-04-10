from viavai import Page
from viavai.ui import Card, Text, Button
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
class HomePage(Page):
    title = "My Page"

    def __init__(self):
        self.add_breadcrumb("Home", href="/")
        self.add_breadcrumb("My Page", href="/my-page")

        for i in range(5):
            card = MyCard(f"Card {i+1}", f"This is the description for card {i+1}.")
            self.add(card)
