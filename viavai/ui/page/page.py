from collections import OrderedDict
from ..base import Base


class Page(Base):
    """Base class for all pages"""
    title: str = "A ViaVai Page"
    logo: str = "/images/logo.svg"

    # Page breadcrumb
    _breadcrumb: OrderedDict[str, str]

    def add_breadcrumb(self, name: str, href: str) -> None:
        if self._breadcrumb is None:
            self._breadcrumb = OrderedDict()
        self._breadcrumb[name] = href
        
    def _render(self) -> dict:
        return {
            "title": self.title,
            "breadcrumb": [
                {"name": name, "href": href}
                for name, href in self._breadcrumb.items()
            ]
        }

    def _event(self, event):
        return super()._event(event)
    


