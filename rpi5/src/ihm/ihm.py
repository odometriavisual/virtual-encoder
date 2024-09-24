from queue import Queue
from threading import Thread

from .server import FlaskInterfaceApp
from .display import Screen

class IHM:
    def __init__(self, get_img):
        self._event_queue = Queue(4)
        self._threads = []

        self.flask_interface = FlaskInterfaceApp(self.send_event, get_img)
        self.oled_screen = Screen()

    def send_event(self, ev):
        self._event_queue.put(ev)

    def print_message(self, message: str):
        for line, text in enumerate(message.split('\n')):
            self.oled_screen.drawLine(line, text)
        self.oled_screen.update()

    def start_listening(self, event_sources):
        for source in event_sources:
            self._threads.append(Thread(daemon=True, target=source))
            self._threads[-1].start()


    def poll_event(self):
        if self._event_queue.empty():
            return False
        else:
            return self._event_queue.get_nowait()
