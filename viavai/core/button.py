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

    def __init__(self):
        ...

    def render(self) -> dict:
        ...