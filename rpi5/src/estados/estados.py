import time

from abc import abstractmethod

from ..pulse_generator import PulseGenerator
from ..ihm.ihm import IHM

class Estado:
    def stop(self):
        pass

    @abstractmethod
    def run(self):
        pass

class EstadoSet(Estado):
    def __init__(self, status: dict):
        status['estado'] = 'Set'

    def run(self):
        time.sleep(0.001)

class EstadoReady(Estado):
    def __init__(self, status: dict):
        status['estado'] = 'Ready'

    def run(self):
        time.sleep(0.001)

class EstadoAquisicaoTempo(Estado):
    def __init__(self, status: dict, encoders: tuple[PulseGenerator, ...], pulses_frequency: int):
        self.encoders = encoders

        status['estado'] = 'Aquisicao'

        self.period = 1_000_000_000 // pulses_frequency
        self.next_time = time.time_ns() + self.period

    def run(self):
        current_time = time.time_ns()
        if current_time > self.next_time:
            for encoder in self.encoders:
                encoder.send_pulses(count=1)

            self.next_time = current_time + self.period

        time.sleep(0.001)

class EstadoErro(Estado):
    def __init__(self, ihm: IHM, status: dict, message):
        self.ihm = ihm

        status['estado'] = message

        self.time_now = time.time_ns()
        self.time_exit = self.time_now + int(5e9)

    def run(self):
        self.time_now = time.time_ns()
        if self.time_now > self.time_exit:
            self.ihm.send_event('next_estado')
        else:
            time.sleep(0.5)
