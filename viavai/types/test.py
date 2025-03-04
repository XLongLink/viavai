from pydantic import BaseModel
from typing import Literal


class Header(BaseModel):
    logo: str
    title: str
    subtitle: str


class Item(BaseModel):
    logo: str
    name: str


class Section(BaseModel):
    name: str
    type: Literal["default", "plus"]
    items: list[Item]


class Object(BaseModel):
    header: Header
    body: list[Section]
    footer: str