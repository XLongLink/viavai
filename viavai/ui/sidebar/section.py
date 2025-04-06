from typing import Literal
from .item import Item
from ..base import Base


class Section(Base):
    name: str
    items: list[Item]
    variant: Literal['default', 'plus', 'collapse'] = 'default'

    def add_item(self, name: str, *, icon: str = None, href: str = None) -> Item:
        item = Item(icon=icon, name=name, href=href)
        self.items.append(item)
        return item

    def __render__(self) -> dict:
        return {
            "name": self.name,
            "items": [item.__render__() for item in self.items],
            "variant": self.variant
        }
