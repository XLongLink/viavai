class App:
    """"""

    def _render(self) -> dict:
        """Render the app, return the Json structure"""
        return {
            "json": "test"
        }

    def _events(self, message):
        """Handle the forwarding of the events"""
        print(message)     
        return self._render()   
