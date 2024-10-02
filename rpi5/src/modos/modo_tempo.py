from ..ihm.ihm import IHM
from ..pi_zero_client import PiZeroClient
from ..pulse_generator import PulseGenerator
from ..relay import Relay

from ..estados import *

class ModoTempo:
    def __init__(self, client: PiZeroClient, ihm: IHM, encoders: (PulseGenerator, PulseGenerator, PulseGenerator), relay: Relay):
        self.ihm = ihm
        self.ihm.modo = 'Tempo'

        self.encoders = encoders
        self.client = client

        self.estado = EstadoSet(self.ihm)

    def run(self):
        self.estado.run()

    def handle_event(self, ev):
        match self.estado, ev:
            case _, ('Erro', message):
                self.estado = EstadoErro(self.ihm, message)

            case EstadoErro(), 'next_estado':
                self.estado = EstadoSet(self.ihm)

            case EstadoSet(), 'next_estado':
                self.estado = EstadoCalibracao(self.ihm, self.client)

            case EstadoCalibracao(), 'fim_calibracao':
                self.estado = EstadoReady(self.ihm)

            case EstadoReady(), 'next_estado':
                self.estado = EstadoDisparo(self.ihm, self.encoders)

            case EstadoDisparo(), 'next_estado':
                self.estado = EstadoSet(self.ihm)
