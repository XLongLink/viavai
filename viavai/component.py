import uuid
from abc import ABC, abstractmethod


class Component(ABC):
    _id = None
    
    def __init_subclass__(cls, **kwargs):
        original_init = cls.__init__
        def new_init(self: "Component", *args, **kwargs):
            self._id = str(uuid.uuid4())
            original_init(self, *args, **kwargs)

        cls.__init__ = new_init

    @abstractmethod
    def _render(self) -> dict:
        """Render the component, return the Json structure"""

    @abstractmethod
    def _event(self, message: dict) -> None:
        """Handle the forwarding of the event"""
    