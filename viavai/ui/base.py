import uuid
from typing import Union, get_type_hints
from ..context import state


class Base:
    """Base class for all components"""
    __id__ = str
    __type__ = "component"
    __children__: Union[str, "Base", list["Base"]] = None

    def __init__(self, *args, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)

    def __new__(cls, *args, **kwargs):
        instance = super().__new__(cls)
        instance.__id__ = str(uuid.uuid4())
        hints = get_type_hints(cls)

        # Initialize class attributes based on their type hints
        for attr, attr_type in hints.items():
            if not hasattr(instance, attr):
                setattr(instance, attr, attr_type())

        # Attach the class to the global event state
        state.add_event(instance.__id__, instance.__event__)

        return instance
    
    def __render__(self) -> dict:
        """Render the component"""
        name = self.__class__.__type__.title()
        props = {
            key.replace(f'_{name}__', ''): getattr(self, key) for key in self.__dict__ 
            if key.startswith(f'_{name}__') and not key.endswith('__')
        }   

        children = [self.__children__] if not isinstance(self.__children__, list) else self.__children__
        children = [children.__render__() if isinstance(children, Base) else children for children in children]

        return {
            "type": self.__type__,
            "props": {
                "id": self.__id__,
                **props,
            },
            "children": children
        }

    def __event__(self, event: str) -> None:
        """Decorator to handle an event"""
        raise NotImplementedError("Event method not implemented")

    def __repr__(self):
        attrs = []
        for key, value in self.__dict__.items():
            if not key.startswith('_'):
                attrs.append(f"{key}={repr(value)}")
        
        attr_str = ", ".join(attrs)
        return f"{self.__class__.__name__}({attr_str})"
