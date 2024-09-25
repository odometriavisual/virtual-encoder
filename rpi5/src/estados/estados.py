import time

from ..pulse_generator import PulseGenerator

class EstadoSet:
    def __init__(self, ihm):
        ihm.estado = 'SET'
        ihm.update_display()

    def run(self):
        time.sleep(0.001)
        return None

class EstadoReady:
    def __init__(self, ihm):
        ihm.estado = 'READY'
        ihm.update_display()

    def run(self):
        time.sleep(0.001)
        return None

class EstadoDisparo:
    def __init__(self, ihm, encoders: (PulseGenerator, PulseGenerator, PulseGenerator)):
        self.period = 1
        self.next_time = time.monotonic() + self.period
        self.encoders = encoders

        ihm.estado = 'DISPARO'
        ihm.update_display()

    def run(self):
        current_time = time.monotonic()
        if current_time > self.next_time:
            self.encoders[0].send_pulses(count=1)
            self.encoders[1].send_pulses(count=2)
            self.encoders[2].send_pulses(count=3)
            self.next_time = current_time + self.period

        time.sleep(0.001)
        return None

