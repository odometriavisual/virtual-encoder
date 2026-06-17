from queue import Queue, Full

class EventsStream:
    def __init__(self):
        self._subscribers = []

    def publish(self, msg):
        for subscriber in self._subscribers:
            try:
                subscriber.put(msg, block=False)
            except Full:
                pass

    def subscribe(self):
        q = Queue(16)
        self._subscribers.append(q)

        return q

    def unsubscribe(self, q):
        self._subscribers.remove(q)
