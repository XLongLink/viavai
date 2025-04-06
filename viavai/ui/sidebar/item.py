from .subitem import SubItem
from ..base import Base


class Item(Base):
    name: str
    icon: str
    href: str
    items: list[SubItem]

    def add_subitem(self, name: str, *, icon: str = None, href: str = None) -> SubItem:
        subitem = SubItem(name=name, icon=icon, href=href)
        self.items.append(subitem)
        return subitem
    
    def __render__(self) -> dict:
        return {
            "name": self.name,
            "icon": self.icon,
            "href": self.href,
            "items": [subitem.__render__() for subitem in self.items]
        }
