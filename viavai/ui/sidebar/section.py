from typing import Literal
from .item import Item
from ..base import Base
from ..types import TypeIcon



type SectionVariant = Literal[
    'default', 
    'plus', 
    'collapse'
]

class Section(Base):
    __name: str
    __items: list[Item]
    __variant: Literal['default', 'plus', 'collapse'] = 'default'

    def __init__(self, name: str, *, variant: SectionVariant = None) -> None:
        self.__name = name
        self.__variant = variant if variant else 'default'

    def add_item(self, name: str, *, icon: TypeIcon = None, href: str = None) -> Item:
        item = Item(icon=icon, name=name, href=href)
        self.__items.append(item)
        return item

    def __render__(self) -> dict:
        return {
            "name": self.__name,
            "items": [item.__render__() for item in self.__items],
            "variant": self.__variant
        }
