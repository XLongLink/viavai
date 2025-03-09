from pydantic import BaseModel
from .navbar import Section


class State(BaseModel):
    """Is the object that is sent to the user to render the page
    This object has to be in sync from the backend to the frontend
    """
    logo: str             # URL to the Logo 
    title: str            # Title of the application
    subtitle: str         # Subtitle of the application (if any)

    header: list[Section] # List of sections in the header
    # main: list[Section] # The main content  