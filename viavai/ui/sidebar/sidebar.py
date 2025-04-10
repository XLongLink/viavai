from ..base import Base
from .section import Section
from .section import SectionVariant


class Sidebar(Base):
    """"""
    __title: str = "ViaVai"
    __subtitle: str = "A LongLink creation"
    __logo: str = "logo.svg"

    __sections: list[Section]

    def __render__(self):
        return {
            "title": self.__title,
            "subtitle": self.__subtitle,
            "logo": self.__logo,
            "sections": [section.__render__() for section in self.__sections]
        }
    
    def add_section(self, name: str, variant: SectionVariant = "default") -> Section:
        section = Section(name=name, variant=variant)
        self.__sections.append(section)
        return section
    
    def set_title(self, title: str):
        self.__title = title

    def set_subtitle(self, subtitle: str):
        self.__subtitle = subtitle

    def set_logo(self, logo: str):
        self.__logo = logo
