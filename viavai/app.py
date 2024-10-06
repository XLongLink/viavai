import json
from .page import Page


class App:
    """"""
    def __init__(self):
        self._pages: list[Page] = []

    def render(self) -> dict:
        """Render the app, return the Json structure"""
        obj = {}
        if self._pages:
            obj["main"] = self._pages[0].render()
        return obj
    
    def _events(self, message):
        """Handle the forwarding of the events"""
        page = self._pages[0]
        page.event(message)
        return self.render()   
