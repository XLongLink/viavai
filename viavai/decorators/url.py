import re

# A global registry for (compiled regex, class) pairs.
route_registry: list[tuple[re.Pattern, type]] = []

def url(route_pattern):
    """
    Decorator that registers a class with a URL route pattern.
    Placeholders in the route pattern (like {project_id}) are converted into named regex groups.
    """
    def decorator(cls):
        # Convert placeholders to regex groups. For instance, {project_id} becomes (?P<project_id>[^/]+)
        pattern = re.sub(r'{(\w+)}', r'(?P<\1>[^/]+)', route_pattern)
        # Ensure we match the entire URL.
        regex = '^' + pattern + '$'
        route_registry.append((re.compile(regex), cls))
        return cls
    return decorator

def get_class(href: str) -> type | None:
    """Return the class that matches the given URL."""
    for pattern, cls in route_registry:
        if match := pattern.match(href):
            params = match.groupdict()
            return cls(**params)
    return None
