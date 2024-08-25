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

The `App` class contains the core logic and functionality of the application. When a user connects, the `Server` class creates a separate instance of the `App` for each user, ensuring that the same logic is applied to all users while keeping their sessions isolated. The `Server` class is responsible for running the application and managing user connections.


```python
from viavai import App, Server

class MyApp(App):
    def __init__(self):
        super().__init__()
        # Example: Set the logo and the name of the app
        # Example: Connect to some database
        # Example: Load some configuration
        # Example: Add some pages

server = Server(MyApp)
sevrer.run()
```

The application will feature a layout with a menu on the left that includes the logo, application name, and main page links with their corresponding icons. On the right, there will be a main content area. At the top, there will be a quick Command bar and a user avatar on the right, both of which are only visible if enabled.

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                               - ☐ ✕ │
├───────────┬──────────────────────────────────────────────────────────┤
│ ♦ Logo    │                      < Command >                  @ User │
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
│           │                                                          │
└───────────┴──────────────────────────────────────────────────────────┘
```


<br />

## Page

The `Page` class allows to create a new page, each page can have a name, an icon and a url. The url can be dynamic, in this case the value will be passed to the page as a parameter.

```python
from viavai import Server, Page, url


@url("/home/{id}")
class HomePage(Page):
    def __init__(self):
        super().__init__(name="Home", icon="home")

```


<br />

## Ui

The `ui` components of the applications are 

```python
from viavai.ui import Button, Input, Select, Table, Text, Title
```

<br />

## Layouts

```python
from viavai.layouts import Column, Row
```

<br />

## Plots
    
```python
from viavai.plots import LinePlot, BarPlot
```

<br />

## Maps
    
```python
from viavai.maps import Map
```

<br />

## Context

The context is a global object that contains the current user global states. 

In the context are included also the clipboard and the notifications as they are displayed on top of the application.
```python
from viavai import context
```

<br />

## Auth

```python
from viavai.auth import Google, Facebook, Twitter, Github
```


<br />

## Core

```python
from viavai.core import threaded

@threaded
def long_task():
    pass
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
