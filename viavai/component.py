import uuid
from abc import ABC, abstractmethod


class Component(ABC):
    _id = None
    
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        original_init = cls.__init__

        def new_init(self: "Component", *args, **kwargs):
            self._id = str(uuid.uuid4())[:8]
            original_init(self, *args, **kwargs)

        cls.__init__ = new_init

    @abstractmethod
    def render(self) -> dict:
        """Render the component, return the Json structure"""

    @abstractmethod
    def event(self, message: dict) -> None:
        """Handle the forwarding of the event"""
    