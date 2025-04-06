from ..base import Base
from ...context import state


class Text(Base):
    """A button component"""
    text: str
    variant: str = "destructive"
    size: str = "lg"

    # Define callbacks
    __on_click: callable = None

    def __init__(self, text: str):
        self.text = text

    def on_click(self, callback: callable):
        """Set the callback to be called when the button is clicked"""
        self.__on_click = callback

    def _render(self) -> dict:
        return {
            "type": "button",
            "props": {
                "id": self.id,
                "variant": self.variant,
                "size": self.size,
            },
            "children": self.text
        }
    
    def _event(self, event):
        """Handle the event when the button is clicked"""
        if self.__on_click:
            self.__on_click(event)
