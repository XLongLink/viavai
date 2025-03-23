from .subitem import SubItem
from ..component import Component
from dataclasses import dataclass, field


@dataclass
class Item(Component):
    name: str
    icon: str | None = None
    href: str | None = None
    items: list[SubItem] = field(default_factory=list)

    def add_subitem(self, name: str, *, icon: str = None, href: str = None) -> SubItem:
        subitem = SubItem(name=name, icon=icon, href=href)
        self.items.append(subitem)
        return subitem
    
    def _render(self) -> dict:
        return {
            "name": self.name,
            "icon": self.icon,
            "href": self.href,
            "items": [subitem._render() for subitem in self.items]
        }
