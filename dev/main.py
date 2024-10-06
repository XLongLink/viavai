from viavai import App, Server, Page, context
from viavai.ui import Button, VLayout


class MyPage(Page):
    def __init__(self):
        self.layout = VLayout()
        self.add(self.layout)

        context.set("user_id", 123)

        self.button = Button('Hello world')
        self.button.on_click(self.on_click)
        self.layout.add(self.button)

        self._times = 0

    def on_click(self):
        self._times += 1
        user_id = context.get("user_id")
        print(user_id)
        self.button.set_text(f'Hello world ({self._times})')


class MyApp(App):
    def __init__(self):
        page = MyPage()
        self.add_page(page)


# app = MyApp()
# print(app.render())

server = Server(MyApp, development=True)
server.run()