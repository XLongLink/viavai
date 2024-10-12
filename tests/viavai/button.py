from viavai import App, Server, Page
from viavai.ui import Button, VLayout, Input


class MyPage(Page):
    def __init__(self):
        self.layout = VLayout()
        self.add(self.layout)

        self.input = Input()
        self.input.on_input(self.on_input)
        self.layout.add(self.input)
        
        self.button = Button('Hello world')
        self.button.on_click(self.on_click)
        self.layout.add(self.button)

        self._times = 0

    def on_click(self):
        self._times += 1
        self.button.set_text(f'Hello world ({self._times})')

    def on_input(self, value):
        self.button.set_text(value)

class MyApp(App):
    def __init__(self):
        page = MyPage()
        self.add_page(page)


# app = MyApp()
# print(app.render())

server = Server(MyApp, development=True)
server.run()