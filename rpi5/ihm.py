from queue import Queue
from threading import Thread
from server import FlaskInterfaceApp

class IHM:
    def __init__(self, get_img):
        self._event_queue = Queue(4)
        self._threads = []

        self.flask_interface = FlaskInterfaceApp(self.send_event, get_img)

    def send_event(self, ev):
        self._event_queue.put(ev)

    def start_listening(self):
        def read_input():
            while True:
                try:
                    x = input('> ').strip()
                    self.send_event(x)
                except:
                    import time
                    time.sleep(1)
                    pass

        self._threads.append(Thread(daemon=True, target=read_input))
        self._threads.append(Thread(daemon=True, target=self.flask_interface.run))
        for t in self._threads:
            t.start()

    def poll_event(self):
        if self._event_queue.empty():
            return False
        else:
            return self._event_queue.get_nowait()