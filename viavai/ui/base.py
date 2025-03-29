import uuid
from typing import get_type_hints


class Base:
    """Base class for all components"""
    id = str 

    def __init__(self, *args, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)

    def __new__(cls, *args, **kwargs):
        instance = super().__new__(cls)
        instance.id = str(uuid.uuid4())
        hints = get_type_hints(cls)

        # Initialize class attributes based on their type hints
        for attr, attr_type in hints.items():
            if not hasattr(instance, attr):
                setattr(instance, attr, attr_type())

        return instance
    
    def _render(self) -> dict:
        """"""

    def _event(self, event: str) -> None:
        """Handle an event"""

    def __repr__(self):
        attrs = []
        for key, value in self.__dict__.items():
            if not key.startswith('_'):
                attrs.append(f"{key}={repr(value)}")
        
        attr_str = ", ".join(attrs)
        return f"{self.__class__.__name__}({attr_str})"
