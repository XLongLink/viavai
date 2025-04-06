# ViaVai

> [!CAUTION]
> Currently under development. Do not use in production.

Create professional enterprise applications using python only.

ViaVai is designed to be heavily object oriented, most of them component are thought to be extended and customized.

<br />

## Installation

Install the library by running

```bash
pip install viavai
```

<br />

## App

The `App` class implements the core functionality of the application. When a user connects, the `Server` class spawns a dedicated `App` instance for that session, ensuring a consistent experience for all users while keeping each session isolated. The `Server` also orchestrates the application and handles user connections.

```python
from viavai import App, Server

class MyApp(App):
    def __init__(self):
        # Example: Set the logo and the name of the app
        # Example: Connect to some database
        # Example: Load some configuration
        # Example: Add some pages
        # Example: Add the theme

server = Server(MyApp)
sevrer.run()
```

The application will feature a layout with a menu on the left that includes the logo, application name, and main page links with their corresponding icons. On the right, there will be a main content area. At the top, there will be a quick Command bar and a user avatar on the right, both of which are only visible if enabled.

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                               - ☐ ✕ │
├───────────┬──────────────────────────────────────────────────────────┤
│ ♦ Logo    │                      < Command >                         │
├───────────┼──────────────────────────────────────────────────────────┤
│ ⌂ Home    │                                                          │
│ ⌂ Market  │                                                          │
│ ⌂ Dash    │                                                          │
│ ⌂ Logout  │                                                          │
│           │                                                          │
│           │                                                          │
│           │                                                          │
│           │                                                          │
│           │                                                          │
│ @ User    │                                                          │
└───────────┴──────────────────────────────────────────────────────────┘
```

<br >

## Sidebar

From [Shadcn-Sidebar](https://ui.shadcn.com/docs/components/sidebar), uses [lucide-react](https://lucide.dev/guide/packages/lucide-react) for the icons. It
features:

-   Application name and Logo (SidebarHeader)
-   User avatar and name (SidebarFooter)
-   Groups (collapsible)
-   Items (name and icon)
-   SubItems
-   Can have badge / action / menu on the right

<br />

## Context

The context is a global object that contains the current user global states. It can be accesed from any part of the application.

```python
from viavai import context

# Key value store
context.get("user")
context.set("user", "John")
context.set("theme", "dark") # Theme

# Navigate to a specific page
context.navigate("/home")

# Signaling - See core module
context.emit("event_name", **data)

# Clipboard ?
context.set_clipboard("Hello World")
context.get_clipboard()

# Notifications, Alerts and Modals some built-in, other customisable
context.create_alert("Hello World")
context.create_modal("Hello World")
```

<br />

## Core

The `core` module contains a list of decorators that allows to create custom events, signals and threads.

-   `threaded` decorator allows to run a function in a separate thread, all the clients share the same async pool on a single thread. Calling a function with this decorator will not block the main thread.

-   `signal` decorator allows to create a custom signal that can be emitted from any part of the application.

-   `url` decorator allows to create a custom page that with nested urls, see the Page section for more details.

```python
from viavai import threaded, signal, url

@threaded
def long_task():
    pass

# Called when the event is emitted from the context
@signal("event_name")
def on_event():
    pass
```

<br />

## Page

The `Page` class allows to create a new page, like the App class the page is initialized for each user. If the page is added to the menu, the page will be visible to the user, else the page can be accessed only by the url.
When the page is created, the parameters of the url are passed to the constructor of the page.
The page has by default a vertical layout.

```python
from viavai import Page, url
from viavai.ui import Button, Text


@url("/home/{id_1}/{id_2}")
class HomePage(Page):
    def __init__(self, id_1, id_2):
        self.button = Button("Submit")
        self.button.on_click = self.on_click
        self.text = Text("Place here some text")

        # Add the components
        self.add(self.text)

        # Insert a component at a specific position
        self.add(self.button, at=0)

        # Insert a component after another
        self.add(self.button, after=self.text)

        # Insert a component before another
        self.add(self.button, before=self.text)

        # Remove a component
        self.remove(self.text)

        # Remove the component at a specific position
        self.remove(at=0)

        # Remove one component before the input
        self.remove(before=self.input, count=1)

        # Remove the all the components after the input
        self.remove(after=self.input, count=-1)

        # Clear all the components
        self.clear()

    def on_click(self):
        pass
```

<br />

## Ui

In the `ui` module there are a list of basics components that can be used to create the user interface. Components can be extended and customized.

```python
from viavai import Page, context
from viavai.ui import Badge

class MyBadge(Badge):
    def __init__(self, user: str):
        if user == context.get("user"):
            super().__init__("owner", color="green")
        else:
            super().__init__("user", color="blue")
```

<br />

## Layouts

The `layouts` module contains a list of layouts that can be used to create more complex user interfaces.

| Layout    | Description                 |
| --------- | --------------------------- |
| Stack     | Stackin percentage          |
| Grid      | Stack in a grid layout      |
| Scroll    | Scroll                      |
| Card      | Group in a card / hover     |
| Tabs      | Allow multi tabs            |
| Menu      | Contect menu on right click |
| Accordion | Can be open and close       |
| Carousel  | Slide images <- [] ->       |

In this example we create a custom card layout, with some element an event handler.

```python
from viavai import context
from viavai.ui import Card


class MyCard(Card):
    def __init__(self, title: str, default: str):
        self.text = Text(title)
        self.input = Input(default)
        self.button = Button("Submit")
        self.button.on_click = self.on_click

        # Add the components
        self.add(self.text)
        self.add(self.input)
        self.add(self.button)

    def on_click(self):
        content = self.input.get_value()

        # Query a database - As example
        sql = f"SELECT * FROM table WHERE content = %s".format(content)
        result = query(sql)

        self.text.set_value(result)
```

<br />

## Plots

The `plots` module contains a list of plots that can be used to create visualizations. Different types of plots can be created. The goal is to create a simple way to plot the data, but those components have an extend usage that doesn't require to code. For exmaple, zoom, trendline, export, etc. So that the user of the application can interact with the data.

```python
from viavai.plots import LinePlot, BarPlot
```

<br />

## Maps

Similar to the plots, the `maps` module contains a list of maps that can be used to create visualizations. The maps can be customized and extended.

```python
from viavai.maps import Map
```

<br />

## Auth

Since the application is designed to be used in an enterprise environment, the `auth` module contains a list of authentication methods that can be used to authenticate users. We use JWT to authenticate the user.

```python
from viavai.auth import Google, Facebook, Twitter, Github
```

<br />

## Api

The api contains a list of decorators that allows to expose some functions to the client side.  
The function can be called from some part of the applications of from the client side. This allows to bypass the ui and integrate with the application directly to automatize some tasks or create custom applications on top of the existing one.

```python
from viavai.api import get, post, put, delete

@get("/api/data")
def get_data():
    return {"data": "Hello World"}
```

## Implementation

The frontend part is implemented using React. All the libraries are downloaded from the CDN and isolated from the rest of the code, as they are used across the differet components. The `ui/index.jsx` is compiled to `bundle.js` and each react component (Buttons, Text, etc) is compiled to a separate file and are loaded when needed.

Under `ui/index.jsx` is located the code for the dynamic react render. Is configured to dynamically load the components in the order that the server sends them. This allows to controll the entire application from the python code. The `index` is set to follows the basic layout of the application - sidebar, header, main. Is reposible to open a websocket connection to the server, send the events to the server and update the components.

Each component has to work as a standalone element, so that can be created with a fix set of parameters and events triggers. The parameters should not be states as they cannot be updated from the server. The events are triggered from the server and the client has to handle them.

The state of the frontend is always synced with the server, this is done using a nested json structure. Every time a component is updated, the server sends the new state of the component and the client updates the component. We give to each component an unique id so that the server can locate any changes in the component and apply the changes.

```json
{
	"nav": "this has a special structure -> Menu + Sub Menu",
	"aside": "this has a special structure -> Menu + Sub Menu",
	"main": [{}],
	"footer": "this has a special structure -> Links? + Social Media"
}
```

```
uvicorn example.main:server -reload
```
