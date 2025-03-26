from collections import OrderedDict
from ..base import Base


class Page(Base):
    """Base class for all pages"""
    title: str = "A ViaVai Page"
    logo: str = "/images/logo.svg"

    # Page breadcrumb
    _breadcrumb: OrderedDict[str, str]

    # Page elements
    _components: list[Base]

    def add_breadcrumb(self, name: str, href: str) -> None:
        if self._breadcrumb is None:
            self._breadcrumb = OrderedDict()
        self._breadcrumb[name] = href

    def add_component(self, component: Base) -> None:
        self._components.append(component)
        
    def _render(self) -> dict:
        return {
            "children": [component._render() for component in self._components]
        }

    def _event(self, event):
        return super()._event(event)
    


