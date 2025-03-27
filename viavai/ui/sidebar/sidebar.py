from ..base import Base
from .section import Section


class Sidebar(Base):
    """"""
    title: str = "Sidebar"
    subtitle: str = "Subtitle"
    logo: str = "logo.svg"

    _sections: list[Section] = []

    def _render(self):
        return {
            "title": self.title,
            "subtitle": self.subtitle,
            "logo": self.logo,
            "sections": [section._render() for section in self._sections]
        }
    
    def add_section(self, name: str, variant: str = "default") -> Section:
        section = Section(name=name, variant=variant)
        self._sections.append(section)
        return section
    