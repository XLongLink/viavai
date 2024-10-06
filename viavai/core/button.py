from ..component import Component


class Button(Component):
    """
    https://ui.shadcn.com/docs/components/button
    
    Width: 
    - Fill (100%)
    - Fit (Content)
    - int (0-100)

    Height:
    - Tiny (h-6)
    - Small (h-8)
    - Medium (default h-10)
    - Large (h-12)
    - Huge (h-16)
    - int (px)
    
    Style:
    - Primary
    - Secondary
    - Destructive
    - Outline
    - Ghost
    - Link
    """

    _text = ""

    def __init__(self, text: str):
        self._text = text
        self._on_click = None

    def _render(self) -> dict:
        return  { 
            "vButton": {
                "id": self._id,
                "text": self._text,
            }
        }
    
    def _event(self, message: dict) -> None:
        if not message["id"] == self._id:
            return
        if message["type"] == "click":
            self._on_click()

    def set_text(self, text: str):
        self._text = text

    def on_click(self, callback: callable):
        self._on_click = callback