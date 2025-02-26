from ..ihm.ihm import IHM
from ..pi_zero_client import PiZeroClient
from ..pulse_generator import PulseGenerator

from ..estados import *

class ModoAutonomo:
    def __init__(self, client: PiZeroClient, status: dict, encoders: tuple[PulseGenerator, ...]):
        self.client = client
        self.status = status
        self.encoders = encoders

        self.status['modo'] = 'Autonomo'

        self.estado = EstadoAquisicaoTempo(client, self.status, self.encoders, 10, '')

    def stop(self):
        pass

    def run(self):
        self.estado.run()

    def handle_event(self, ev):
        pass
