from ..base import Base


class Page(Base):
    """Base class for all pages"""
    title: str = "A ViaVai Page"
    icon: str = "/images/logo.svg"

    # Page breadcrumb
    _breadcrumb: dict[str, str]

    # Page elements
    _components: list[Base]

    def add_breadcrumb(self, name: str, href: str) -> None:
        if self._breadcrumb is None:
            self._breadcrumb = dict()
        self._breadcrumb[name] = href

    def add(self, component: Base) -> None:
        self._components.append(component)
        
    def _render(self) -> dict:
        return {
            "icon": self.icon,
            "title": self.title,
            "breadcrumb": [
                {"name": name, "href": href} for name, href in self._breadcrumb.items()
            ] if self._breadcrumb else [],
            "children": [component._render() for component in self._components]
        }

    def _event(self, event):
        return super()._event(event)
    