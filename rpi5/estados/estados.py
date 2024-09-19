import time

class EstadoSet:
    def __init__(self):
        pass

    def run(self):
        time.sleep(0.001)
        return None

class EstadoReady:
    def __init__(self):
        pass

    def run(self):
        time.sleep(0.001)
        return None

class EstadoDisparo:
    def __init__(self, encoder):
        self.period = 1
        self.next_time = time.monotonic() + self.period
        self.encoder = encoder

    def run(self):
        current_time = time.monotonic()
        if current_time > self.next_time:
            self.encoder.send_pulses(count=1)
            self.next_time = current_time + self.period

        time.sleep(0.001)
        return None

