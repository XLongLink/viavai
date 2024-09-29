import json

class App:
    """"""

    def _render(self) -> dict:
        """Render the app, return the Json structure"""
        with open('../tests/example.json') as f:
            data = json.load(f)
        return data
    
    def _events(self, message):
        """Handle the forwarding of the events"""
        print(message)     
        return self._render()   
