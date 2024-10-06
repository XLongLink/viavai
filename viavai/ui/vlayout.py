from ..component import Component


class VLayout(Component):
    def __init__(self) -> None:
        self._children: list[Component] = []

    def add(self, component: Component) -> None:
        self._children.append(component)

    def _render(self) -> dict:
        return {
            "vVLayout": {
                "children": [child._render() for child in self._children]
            }
        }
    
    def _event(self, message: dict) -> None:
        for child in self._children:
            child._event(message)
