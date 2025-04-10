from viavai import Page
from viavai.ui import Text, Button
from viavai.api import url


class PizzaButton(Button):
    def __init__(self, pizzatype: str):
        super().__init__("Order")
        # Fetch the database
        if pizzatype == "prosciutto":
            self.set_variant("default")
        else:
            self.set_variant("outline")


@url("/table")
class TablePage(Page):
    title = "Table Showcase"
    
    def __init__(self):
        txt1 = Text("Table content", size="5xl", variant="title")
        txt2 = Text("Table content", size="sm", variant="subtitle")
        self.add(txt1)
        self.add(txt2)

        self.add(PizzaButton("prosciutto"))
        self.add(PizzaButton("margarita"))
        self.add(PizzaButton("vegetariana"))

    def on_button_click(self, event):
        print("Button clicked!", event)

        # Dump a file
        # Call OpenAI API
        # 

        self.btn.set_text("Clicked!")
        self.btn.set_variant("destructive")

    
