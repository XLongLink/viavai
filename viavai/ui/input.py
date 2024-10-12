from ..component import Component


class Input(Component):
    """
    https://ui.shadcn.com/docs/components/input
    
    - text
    - password
    - email
    - number (int / float) -> arrows for increment

    - placeholder
    -> position of the placeholder
    -> can be a link
    - icon
    """ 

    _value = ""

    def __init__(self, value: str = None) -> None:
        self._value = value or ""
        self._on_input = None

    def _render(self) -> dict:
        return {
            "vInput": {
                "id": self._id,
                "value": self._value,
            }
        }
    
    def _event(self, message: dict) -> None:
        if not message["id"] == self._id:
            return
        if message["type"] == "input":
            self._value = message["value"]
            self._on_input(self._value)

        print(self._value)

    def set_value(self, value: str):
        self._value = value
    
    def get_value(self) -> str:
        return self._value
    
    def on_input(self, callback: callable):
        self._on_input = callback