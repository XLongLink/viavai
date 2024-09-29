from .component import Component


class Page:
    """Generic page of a viavai App"""

    def __init__(self) -> None:
        self._components: list[Component] = []

    def render(self) -> dict:
        """Render the page, return the Json structure"""
        return [component.render() for component in self._components]