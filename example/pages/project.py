from viavai import Page, url


@url("/projects/{project_id}")
class Project(Page):
    title = "Project"

    def __init__(self, project_id: str):
        self.add_breadcrumb(f"{project_id}", f"/projects/{project_id}")
