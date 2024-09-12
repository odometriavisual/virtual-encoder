from queue import Queue
from threading import Thread

class IHM:
    def __init__(self):
        self._event_queue = Queue(4)
        self._thread = None

    def start_listening(self):
        def read_input():
            while True:
                x = input('> ').strip()
                self._event_queue.put(x)

        self._thread = Thread(target=read_input)
        self._thread.start()

    def poll_event(self):
        if self._event_queue.empty():
            return False
        else:
            return self._event_queue.get_nowait()