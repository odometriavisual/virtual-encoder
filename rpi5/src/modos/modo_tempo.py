from ..ihm.ihm import IHM
from ..pi_zero_client import PiZeroClient
from ..pulse_generator import PulseGenerator

from ..estados import *

class ModoTempo:
    def __init__(self, client: PiZeroClient, ihm: IHM, status: dict, encoders: tuple[PulseGenerator, ...]):
        self.client = client
        self.ihm = ihm
        self.status = status
        self.encoders = encoders

        self.status['modo'] = 'Tempo'

        self.estado = EstadoSet(self.status)

    def stop(self):
        pass

    def run(self):
        self.estado.run()

    def handle_event(self, ev):
        match self.estado, ev:
            case _, ('Erro', message):
                self.estado = EstadoErro(self.ihm, self.status, message)

            case EstadoErro(), 'next_estado':
                self.estado = EstadoSet(self.status)

            case EstadoSet(), 'next_estado':
                self.estado = EstadoCalibracao(self.ihm, self.status, self.client)

            case EstadoCalibracao(), 'fim_calibracao':
                self.estado = EstadoReady(self.status)

            case EstadoReady(), 'next_estado':
                self.estado = EstadoAquisicaoTempo(self.status, self.encoders, 10)

            case EstadoReady(), ('next_estado', _, pulses_frequency):
                self.estado = EstadoAquisicaoTempo(self.status, self.encoders, int(pulses_frequency))

            case EstadoAquisicaoTempo(), 'next_estado':
                self.estado = EstadoSet(self.status)
