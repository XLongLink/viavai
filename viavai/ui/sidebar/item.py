from .subitem import SubItem
from ..base import Base
from ..types import TypeIcon

class Item(Base):
    __name: str
    __icon: TypeIcon = None
    __href: str
    __items: list[SubItem]

    def __init__(self, name: str, icon: TypeIcon = None, href: str = None) -> None:
        self.__name = name
        self.__icon = icon
        self.__href = href

    def add_subitem(self, name: str, *, icon: TypeIcon = None, href: str = None) -> SubItem:
        subitem = SubItem(name=name, icon=icon, href=href)
        self.__items.append(subitem)
        return subitem
    
    def __render__(self) -> dict:
        return {
            "name": self.__name,
            "icon": self.__icon,
            "href": self.__href,
            "items": [subitem.__render__() for subitem in self.__items]
        }
