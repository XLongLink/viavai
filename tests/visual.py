import json
import argparse
from viavai import App, Server


class MyApp(App):
    def __init__(self, json_file):
        super().__init__()
        self.json_file = json_file if json_file.endswith(".json") else f"{json_file}.json"
    
    def _render(self) -> dict:
        with open(f"json/{self.json_file}") as f:
            data = json.load(f)
        return data


if __name__ == "__main__":
    # Create an argument parser to accept the JSON file path from the command line
    parser = argparse.ArgumentParser(description="Serve a JSON file via Viavai app.")
    parser.add_argument('--json', type=str, required=True, help='Path to the JSON file to render')

    # Parse the command-line arguments
    args = parser.parse_args()

    # Pass the JSON file path to the app
    server = Server(lambda: MyApp(args.json), development=True)
    server.run()
