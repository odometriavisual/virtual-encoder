import time

from ..pulse_generator import PulseGenerator
from ..ihm.ihm import IHM

class EstadoSet:
    def __init__(self, ihm: IHM):
        ihm.estado = 'Set'
        ihm.update_display()

    def run(self):
        time.sleep(0.001)

class EstadoReady:
    def __init__(self, ihm: IHM):
        ihm.estado = 'Ready'
        ihm.update_display()

    def run(self):
        time.sleep(0.001)

class EstadoDisparo:
    def __init__(self, ihm: IHM, encoders: (PulseGenerator, PulseGenerator, PulseGenerator)):
        self.period = 1
        self.next_time = time.monotonic() + self.period
        self.encoders = encoders

        ihm.estado = 'Disparo'
        ihm.update_display()

    def run(self):
        current_time = time.monotonic()
        if current_time > self.next_time:
            self.encoders[0].send_pulses(count=1)
            self.encoders[1].send_pulses(count=2)
            self.encoders[2].send_pulses(count=3)
            self.next_time = current_time + self.period

        time.sleep(0.001)

class EstadoErro:
    def __init__(self, ihm: IHM, message):
        self.ihm = ihm

        self.ihm.estado = message
        self.ihm.update_display()

        self.time_now = time.monotonic_ns()
        self.time_exit = self.time_now + int(5e9)

    def run(self):
        self.time_now = time.monotonic_ns()
        if self.time_now > self.time_exit:
            self.ihm.send_event('next_estado')
        else:
            time.sleep(0.5)
