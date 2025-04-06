from ..base import Base


# TODO: Change this with a better name
class SubItem(Base):
    name: str
    icon: str | None = None
    href: str | None = None

    def __render__(self) -> dict:
        return {
            "name": self.name,
            "icon": self.icon,
            "href": self.href
        }
