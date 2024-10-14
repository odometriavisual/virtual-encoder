import time
import numpy as np
import threading
from os.path import isfile
import csv
from src.localPiZeroClient import LocalPiZeroClient

class IMULogger:
    '''
        Como usar:
            path = "test.csv"
            logger = IMULogger(path, client)
            logger.start_listening()
            ...
            logger.stop_listening()
    '''

    def __init__(self, path, client: LocalPiZeroClient):
        self.path = path
        self.measure_period = 1 * 1e9  # ns
        self.save_period = 10 * 1e9  # ns
        self.client = client

        if not isfile(self.path):
            with open(self.path, mode='w', newline='') as file:
                writer = csv.writer(file)
                writer.writerow(["timestamp","boot_time","qx","qy","qz","qw"])

    def insert(self, measure: [float, float, float, float, float, float]):
        with open(self.path, mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(list(measure))

    def start_listening(self):
        def _listen():
            time_now = time.monotonic_ns()
            next_measure = time_now + self.measure_period

            while self.listening:
                time_now = time.monotonic_ns()
                if time_now > next_measure:
                    next_measure += self.measure_period

                    if data := self.client.get_orientation():
                        self.insert(data)
                        print(data)
                    else:
                        next_measure += self.measure_period * 10

                time.sleep(0.01)

        self.listening = True
        self.thread = threading.Thread(daemon=True, target=_listen)
        self.thread.start()

    def stop_listening(self):
        self.listening = False
        if self.thread.is_alive():
            self.thread.join()

