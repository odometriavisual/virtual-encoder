import time
import numpy as np
import threading
from os.path import isfile

from ..pi_zero_client import PiZeroClient

class IMULogger:
    def __init__(self, filename):
        self.filename = filename
        self.index = 0

        if isfile(filename):
            self.measures = np.load(filename)
            self.measures.sort(axis=0)
        else:
            self.measures = np.zeros((15_000, 6))

    def insert(self, measure: [float, float, float, float, float, float]):
        self.measures[self.index] = measure
        self.index += 1

    def save(self):
        np.save(self.filename, self.measures)

    def listen(self, client: PiZeroClient):
        def _listen():
            time_now = time.monotonic()
            next_measure = time_now + 0.1
            next_save = time_now + 10

            while True:
                time_now = time.monotonic()
                if time_now > next_measure:
                    next_measure = time_now + 0.1
                    self.insert(client.get_orientation())

                if time_now > next_save:
                    next_save = time_now + 30
                    self.save()

                time.sleep(0.01)

        threading.Thread(daemon=True, target=_listen).start()
