from typing import Literal
from ..base import Base

type TextVariant = Literal[
    "base",
    "title",
    "subtitle",
    "underline",
    "muted",
    "italic",
]

type TextSize = Literal[
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
    __type__: str = "text"
    __children__: str
    
    __size: TextVariant = "base"
    __variant: TextSize = "destructive"

    def __init__(self, text: str, variant: TextVariant = "base", size: TextSize = "base"):
        self.__size = size
        self.__variant = variant
        self.__children__ = text

