from ..base import Base

class Button(Base):
    """A button component"""
    text: str

    def __init__(self, text: str):
        self.text = text

    def _render(self) -> dict:
        return {
            "type": "button",
            "props": {
                "variant": "destructive",
                "size": "lg"
            },
            "children": self.text
        }
