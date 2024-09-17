from queue import Queue
from threading import Thread
from server import VideoStreamApp

class IHM:
    def __init__(self, client):
        self._event_queue = Queue(4)
        self._thread = None
        self.stream = VideoStreamApp(client)
        self.stream.run()


    def start_listening(self):
        def send_event(ev):
            self._event_queue.put(ev)

        def read_input():
            while True:
                try:
                    x = input('> ').strip()
                    send_event(x)
                except:
                    import time
                    time.sleep(1)
                    pass

        self._thread = Thread(target=read_input)
        self._thread.start()

    def poll_event(self):
        if self._event_queue.empty():
            return False
        else:
            return self._event_queue.get_nowait()