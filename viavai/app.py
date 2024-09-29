import json
from .page import Page


class App:
    """"""
    def __init__(self):
        self._pages: list[Page] = []

    def render(self) -> dict:
        """Render the app, return the Json structure"""
        print(self._pages)
        if self._pages:
            return self._pages[0].render()

        with open('../tests/example.json') as f:
            data = json.load(f)
        return data
    
    def _events(self, message):
        """Handle the forwarding of the events"""  
        return self.render()   
