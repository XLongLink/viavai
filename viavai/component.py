from abc import ABC, abstractmethod
from typing import Optional
from pydantic import BaseModel


class Component(ABC):

    @abstractmethod
    def _render(self) -> BaseModel:
        """Render the component into a pydantic model"""

    def _event(self, event: str):
        """Handle an event"""
        pass