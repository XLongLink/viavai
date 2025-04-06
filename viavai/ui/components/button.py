from ..base import Base
from ...context import state


class Button(Base):
    """A button component"""
    __type__: str = "button"
    __size: str = "lg"
    __variant: str = "destructive"
    
    __children__: str

    # Define callbacks
    __on_click__: callable = None

    def __init__(self, text: str, size: str = "lg", variant: str = "destructive"):
        self.__size = size
        self.__variant = variant
        self.__children__ = text

    def on_click(self, callback: callable):
        """Set the callback to be called when the button is clicked"""
        self.__on_click__ = callback

    def __event__(self, event):
        """Handle the event when the button is clicked"""
        if self.__on_click__:
            self.__on_click__(event)
