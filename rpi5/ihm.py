from queue import Queue
from threading import Thread

class IHM:
    def __init__(self):
        self._event_queue = Queue(4)
        self._thread = None

    def start_listening(self):
        def send_event(ev):
            self._event_queue.put(ev)

        def read_input():
            while True:
                x = input('> ').strip()
                send_event(x)

        def read_flask():
            from server import app
            app.send_event = send_event
            app.run(host='0.0.0.0', port=5000)

        self._thread = Thread(target=read_flask)
        self._thread.start()

    def poll_event(self):
        if self._event_queue.empty():
            return False
        else:
            return self._event_queue.get_nowait()