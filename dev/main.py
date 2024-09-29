from viavai import App, Server, Page
from viavai.core import Button

class MyPage(Page):
    def __init__(self):
        super().__init__()
        button = Button('Hello world')
        self._components.append(button)

class MyApp(App):
    def __init__(self):
        print("HEEEEEEEEEEEEEEEEEEEE")
        super().__init__()
        page = MyPage()
        self._pages.append(page)
        print(page)


server = Server(App, development=True)
server.run()