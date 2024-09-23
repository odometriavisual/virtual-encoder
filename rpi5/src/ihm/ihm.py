import time
from queue import Queue
from threading import Thread

from .server import FlaskInterfaceApp
from .gpiod_button import GpiodButton
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

    def start_listening(self):
        def read_input():
            while True:
                try:
                    x = input('> ').strip()
                    self.send_event(x)
                except:
                    time.sleep(1)
                    pass

        def check_all_buttons():
            button1 = GpiodButton(18)
            button2 = GpiodButton(27)
            button3 = GpiodButton(24)

            while True:
                if button1.checkButton() is True:
                    self.send_event("botao1")
                    time.sleep(1)
                if button2.checkButton() is True:
                    self.send_event("botao2")
                    time.sleep(1)
                if button3.checkButton() is True:
                    self.send_event("botao3")
                    time.sleep(1)
                time.sleep(0.1)

        self._threads.append(Thread(daemon=True, target=read_input))
        self._threads.append(Thread(daemon=True, target=self.flask_interface.run))
        self._threads.append(Thread(daemon=True, target=check_all_buttons))
        for t in self._threads:
            t.start()


    def poll_event(self):
        if self._event_queue.empty():
            return False
        else:
            return self._event_queue.get_nowait()
