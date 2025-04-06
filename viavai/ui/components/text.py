from typing import Literal
from ..base import Base
from ...context import state

type ButtonVariant = Literal[
    "base",
    "title",
    "subtitle",
    "underline",
    "muted",
    "italic",
]

type ButtonSize = Literal[
    "xs",
    "sm",
    "base",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
    "8xl",
    "9xl",
]

class Text(Base):
    """A button component"""
    text: str
    variant: ButtonVariant = "destructive"
    size: ButtonSize = "base"

    def __init__(self, text: str):
        self.text = text

    def _render(self) -> dict:
        return {
            "type": "text",
            "props": {
                "id": self.id,
                "variant": self.variant,
                "size": self.size,
            },
            "children": self.text
        }

