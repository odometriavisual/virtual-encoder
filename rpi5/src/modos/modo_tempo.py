from ..ihm.ihm import IHM
from ..pi_zero_client import PiZeroClient
from ..pulse_generator import PulseGenerator

from ..estados import *

class ModoTempo:
    def __init__(self, client: PiZeroClient, ihm: IHM, encoders: (PulseGenerator, PulseGenerator, PulseGenerator)):
        self.ihm = ihm
        self.ihm.modo = 'Tempo'

        self.encoders = encoders
        self.client = client

        self.estado = EstadoSet(self.ihm)

    def run(self):
        self.estado.run()

    def handle_event(self, ev):
        match self.estado, ev:
            case(EstadoSet(), 'botao2'):
                print('Transicao: Set -> Calibracao')
                self.estado = EstadoCalibracao(self.ihm, self.client)

            case(EstadoCalibracao(), 'fim_calibracao'):
                print('Transicao: Calibracao -> Ready')
                self.estado = EstadoReady(self.ihm)

            case(EstadoReady(), 'botao2'):
                print('Transicao: Ready -> Disparo')
                self.estado =EstadoDisparo(self.ihm, self.encoders)

            case(EstadoDisparo(), 'botao2'):
                print('Transicao: Disparo -> Set')
                self.estado = EstadoSet(self.ihm)
