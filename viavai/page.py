from .component import Component


class Page:
    """Generic page of a viavai App"""

    def __init__(self) -> None:
        self._components: list[Component] = []
        self._ids: dict[str, Component] = {}

    def add(self, component: Component) -> None:
        """Add a component to the page"""
        self._components.append(component)
    
    def render(self) -> dict:
        """Render the page, return the Json structure"""
        return [component.render() for component in self._components]
    
    def event(self, message: dict) -> None:
        """Handle the forwarding of the events"""
        for component in self._components:
            component.event(message)