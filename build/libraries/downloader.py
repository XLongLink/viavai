import os
import requests
from urllib.parse import urljoin


class Downloader:
    """Download a specific package and a given version from unpkg.com"""

    def __init__(self, name: str, version: str):
        self.name = name
        self.version = version
        self.content = None
        self.url = f"https://unpkg.com/{self.name}@{self.version}/umd/{self.name}.production.min.js"

    def download(self):
        response = requests.get(self.url, allow_redirects=True)
        self.content = response.content

    def save(self, path: str):
        """Save to the downloaded library to the given path"""
        dest = os.path.join(path, f"{self.name}.production.min.js")

        # Ensure the destination directory exists
        if not os.path.exists(path):
            os.makedirs(path, exist_ok=True)

        with open(dest, "wb") as f:
            f.write(self.content)


if __name__ == "__main__":
    downloader = Downloader("react", "17.0.2")
    downloader.download()
    downloader.save(os.getcwd())