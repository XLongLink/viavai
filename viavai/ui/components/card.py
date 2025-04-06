from ..base import Base
from typing import Literal

type CardVariant = Literal["solid", "ghost"]

class Card(Base):
    """A button component"""
    __type__ = "card"
    __children__: list[Base]

    __title: str
    __description: str
    __variant: CardVariant = "solid"

    def __init__(self, title: str, description: str, variant: CardVariant = "solid"):
        self.__title = title
        self.__description = description
        self.__variant = variant

    def add(self, child: Base):
        """Add a child to the card"""
        if not hasattr(self, "__children__"):
            self.__children__ = []
        self.__children__.append(child)
