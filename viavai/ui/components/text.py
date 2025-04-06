from typing import Literal
from ..base import Base

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
    __type__: str = "text"
    __children__: str
    
    __size: ButtonSize = "base"
    __variant: ButtonVariant = "destructive"

    def __init__(self, text: str, variant: ButtonVariant = "base", size: ButtonSize = "base"):
        self.__size = size
        self.__variant = variant
        self.__children__ = text

