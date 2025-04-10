from viavai import Server

# Import the sidebar
from .sidebar import MySidebar

# Import all the pages
from .pages import HomePage
from .pages.table import TablePage
from .pages.ui.card import CardPage
from .pages.ui.text import TextPage
from .pages.ui.button import ButtonPage

server = Server()
server.register(MySidebar)
server.register(HomePage)
server.register(TablePage)
server.register(CardPage)
server.register(TextPage)
server.register(ButtonPage)
