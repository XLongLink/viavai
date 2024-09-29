class Component:
    """Base class for a viavai component"""

    def render(self) -> dict:
        """Render the component, return the Json structure"""
        raise NotImplementedError
