import sys
import time
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


class MyHandler(FileSystemEventHandler):
    def __init__(self, script):
        self.script = script
        self.process = subprocess.Popen([sys.executable, self.script])

    def on_any_event(self, event):
        self.process.terminate()
        self.process = subprocess.Popen([sys.executable, self.script])

if __name__ == "__main__":
    script_to_run = "main.py"
    event_handler = MyHandler(script_to_run)
    observer = Observer()
    observer.schedule(event_handler, path='../viavai', recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()