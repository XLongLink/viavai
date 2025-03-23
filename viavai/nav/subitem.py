from dataclasses import dataclass
from ..component import Component



# TODO: Change this with a better name
@dataclass
class SubItem(Component):
    name: str
    icon: str | None = None
    href: str | None = None

    def _render(self) -> dict:
        return {
            "name": self.name,
            "icon": self.icon,
            "href": self.href
        }
