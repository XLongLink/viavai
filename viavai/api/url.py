import re
from ..page import Page


def url(route):
    """
    Decorator that registers a class with a URL route pattern.
    Placeholders in the route pattern (like {project_id}) are converted into named regex groups.
    """
    def decorator(cls: type[Page]):
        # Convert placeholders to regex groups. For instance, {project_id} becomes (?P<project_id>[^/]+)
        pattern = re.sub(r'{(\w+)}', r'(?P<\1>[^/]+)', route)
        # Ensure we match the entire URL.
        regex = '^' + pattern + '$'
        cls.__url__ = re.compile(regex)
        return cls
    return decorator
