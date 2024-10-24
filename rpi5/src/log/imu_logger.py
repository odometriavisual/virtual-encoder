import time
import numpy as np
import threading
from os.path import isfile

from ..pi_zero_client import PiZeroClient

class IMULogger:
    def __init__(self, filename):
        self.filename = filename
        self.index = 0

        self.measure_period = 1 * 1e9 # ns
        self.save_period = 10 * 1e9 # ns

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
            time_now = time.time_ns()
            next_measure = time_now + self.measure_period
            next_save = time_now + self.save_period

            while True:
                time_now = time.time_ns()
                if time_now > next_measure:
                    next_measure += self.measure_period

                    if quat := client.get_orientation():
                        self.insert(quat)
                    else:
                        next_measure += self.measure_period * 10

                if time_now > next_save:
                    next_save += self.save_period
                    self.save()

                time.sleep(0.01)

        threading.Thread(daemon=True, target=_listen).start()
