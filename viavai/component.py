from abc import ABC, abstractmethod


class Component(ABC):
    @abstractmethod
    def _render(self) -> dict:
        """Render the component into a pydantic model"""

    def _event(self, event: str):
        """Handle an event"""
        pass