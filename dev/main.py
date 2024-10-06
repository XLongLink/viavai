from viavai import App, Server, Page
from viavai.core import Button, VLayout

class MyPage(Page):
    def __init__(self):
        super().__init__()

        self.layout = VLayout()
        self._components.append(self.layout)

        self.buttons = []
        for i in range(20_000):
            button = Button(f'Hello world {i}')
            button._on_click = self.on_click
            self.layout.add(button)
            self.buttons.append(button)

        self._times = 0

    def on_click(self):
        self._times += 1
        for button in self.buttons:
            button._text = f'Button clicked {self._times} times'

class MyApp(App):
    def __init__(self):
        super().__init__()
        page = MyPage()
        self._pages.append(page)


# app = MyApp()
# print(app.render())

server = Server(MyApp, development=True)
server.run()