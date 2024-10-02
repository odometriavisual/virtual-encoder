from ..ihm.ihm import IHM
from ..pi_zero_client import PiZeroClient
from ..pulse_generator import PulseGenerator
from ..relay import Relay

from ..estados import *

class ModoAutonomo:
    def __init__(self, client: PiZeroClient, ihm: IHM, encoders: tuple[PulseGenerator, ...]):
        self.ihm = ihm
        self.ihm.modo = 'Autonomo'

        self.encoders = encoders
        self.client = client

        self.estado = EstadoDisparo(self.ihm, self.encoders)

    def run(self):
        self.estado.run()

    def handle_event(self, ev):
        pass
