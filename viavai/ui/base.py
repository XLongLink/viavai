from abc import ABC, abstractmethod
from typing import get_type_hints


class Base(ABC):
    """Base class for all components"""
    def __init__(self, *args, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)

    def __new__(cls, *args, **kwargs):
        instance = super().__new__(cls)
        hints = get_type_hints(cls)
        
        # Initialize class attributes based on their type hints
        for attr, attr_type in hints.items():
            if not hasattr(instance, attr):
                setattr(instance, attr, attr_type())

        return instance
    
    @abstractmethod
    def _render(self) -> dict:
        """Render the component into a pydantic model"""

    def _event(self, event: str) -> None:
        """Handle an event"""

    def __repr__(self):
        attrs = []
        for key, value in self.__dict__.items():
            if not key.startswith('_'):
                attrs.append(f"{key}={repr(value)}")
        
        attr_str = ", ".join(attrs)
        return f"{self.__class__.__name__}({attr_str})"