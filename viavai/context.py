from contextvars import ContextVar


class UserContext:
    """The user context class is created for each user"""
    def __init__(self, user_id: str):
        # TODO: If the user ID is a known one, load the user's data
        self.user_id = user_id


class Context(UserContext):
    """The context class is created once for the entire application"""

    __var__ = ContextVar("context")

    def __init__(self):
        # Ensure that the parent class is not initialized as it extended just for the type hints
        pass

    def __getattr__(self, item):
        # Delegate attribute access to the UserContext instance
        user_context = self.__var__.get()
        return getattr(user_context, item)


context = Context()

def get(key: str):
    return getattr(context, key)

def set(key: str, value):
    setattr(context, key, value)