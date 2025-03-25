from typing import Literal
from .item import  Item
from ..base import Base


class Section(Base):
    name: str
    items: list[Item]
    variant: Literal['default', 'plus', 'collapse'] = 'default'

    def add_item(self, name: str, *, icon: str = None, href: str = None) -> Item:
        item = Item(icon=icon, name=name, href=href)
        self.items.append(item)
        return item

    def _render(self) -> dict:
        return {
            "name": self.name,
            "items": [item._render() for item in self.items],
            "variant": self.variant
        }
