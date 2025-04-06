from ..base import Base
from .section import Section


class Sidebar(Base):
    """"""
    title: str = "Sidebar"
    subtitle: str = "Subtitle"
    logo: str = "logo.svg"

    _sections: list[Section]

    def __render__(self):
        return {
            "title": self.title,
            "subtitle": self.subtitle,
            "logo": self.logo,
            "sections": [section.__render__() for section in self._sections]
        }
    
    def add_section(self, name: str, variant: str = "default") -> Section:
        section = Section(name=name, variant=variant)
        self._sections.append(section)
        return section
    