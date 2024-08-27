import uuid
import time
import asyncio
import contextvars
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse

# Create a context variable
request_context = contextvars.ContextVar("request_context")

app = FastAPI()
@app.get("/")
async def get():
    return HTMLResponse(open("index.html", "r").read())


class Context:
    def __init__(self, user_id: str):
        self.user_id = user_id

    def get_id(self):
        return self.user_id
    
class CustomContextVar(Context):
    def __init__(self):
        self._context = contextvars.ContextVar("context")

    def _set(self, value):
        self._context_var.set(value)

    def get_id(self):
        return self._context.get()
    

context = CustomContextVar("context")


class MyApp:
    def __init__(self) -> None:
        print(context.get_id())

    def heavy_task(self):
        t0 = time.time()
        time.sleep(5)
        print(context.get_id())
        t1 = time.time()
        return f"Task took {t1 - t0} seconds"

def init_app():
    # Initialization logic that needs access to the context
    return MyApp()

def handle_message(websocket: WebSocket, data: str, my_app: MyApp):
    return my_app.heavy_task()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    user_id = str(uuid.uuid4())
    context = Context(user_id)
    request_context.set(context)

    # Initialize MyApp with the context already set
    my_app = await asyncio.to_thread(init_app)

    try:
        while True:
            # Simulate setting the context for the current user
            data = await websocket.receive_text()
            data = await asyncio.to_thread(handle_message, websocket, data, my_app)
            await websocket.send_text(data)

    except WebSocketDisconnect:
        print("WebSocket connection closed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
