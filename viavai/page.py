from .component import Component


class Page:
    """Generic page of a viavai App"""
    __components: list[Component] = []

    def __init_subclass__(cls, **kwargs):
        """Ensure that the class has a list of components"""
        original_init = cls.__init__

        def new_init(self: "Page", *args, **kwargs):
            self.__components = []
            original_init(self, *args, **kwargs)

        cls.__init__ = new_init

    def add(self, component: Component) -> None:
        """Add a component to the page"""
        self.__components.append(component)
    
    def _render(self) -> dict:
        """Render the page, return the Json structure"""
        return [component._render() for component in self.__components]
    
    def _event(self, message: dict) -> None:
        """Handle the forwarding of the events"""
        for component in self.__components:
            component._event(message)