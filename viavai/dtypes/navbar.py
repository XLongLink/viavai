from typing import Literal
from pydantic import BaseModel


class Item(BaseModel):
    icon: str
    name: str


class Section(BaseModel):
    name: str
    type: Literal["default", "plus"]
    items: list[Item]
