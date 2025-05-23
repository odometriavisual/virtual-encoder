from ..ihm.ihm import IHM
from ..pi_zero_client import PiZeroClient
from ..pulse_generator import PulseGenerator
from ..status import EncoderStatus

from ..estados import *

class ModoTempo:
    def __init__(self, client: PiZeroClient, ihm: IHM, status: EncoderStatus, encoders: tuple[PulseGenerator, ...]):
        self.client = client
        self.ihm = ihm
        self.status = status
        self.encoders = encoders

        self.status.set('modo', 'Tempo')

        self.estado = EstadoReady(self.status)

    def stop(self):
        self.estado.stop()

    def run(self):
        self.estado.run()

    def handle_event(self, ev):
        match self.estado, ev:
            case _, ('Erro', message):
                self.estado = EstadoErro(self.ihm, self.status, message)

            case EstadoErro(), 'next_estado':
                self.estado = EstadoReady(self.status)

            case EstadoReady(), ('next_estado', _, pulses_frequency, reason):
                self.estado = EstadoAquisicaoTempo(self.client, self.status, self.encoders, int(pulses_frequency), reason)

            case EstadoAquisicaoTempo(), 'next_estado':
                self.estado.stop()
                self.estado = EstadoReady(self.status)
