from ..component import Component


class VLayout(Component):
    def __init__(self) -> None:
        self._children: list[Component] = []

    def add(self, component: Component) -> None:
        self._children.append(component)

    def render(self) -> dict:
        return {
            "vVLayout": {
                "children": [child.render() for child in self._children]
            }
        }
    
    def event(self, message: dict) -> None:
        for child in self._children:
            child.event(message)
