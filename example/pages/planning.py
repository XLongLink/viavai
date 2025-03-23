from viavai import Page, url
from example.database import projects


@url("/projects/{project_id}/planning")
class Planning(Page):
    title = "Planning"

    def __init__(self, project_id: str):
        self.project = next((p for p in projects if p["id"] == project_id), None)
        self.add_breadcrumb(f"{self.project["id"]} {self.project["name"]}", f"/projects/{project_id}")
        self.add_breadcrumb(f"Planning", f"/projects/{project_id}/planning")
