from ..estados import *
from ..pi_zero_client import PiZeroClient
from ..status import EncoderStatus
from ..hal.encoder import EncoderNoop


class ModoAutonomo:
    def __init__(self, client: PiZeroClient, status: EncoderStatus, encoders: tuple[EncoderNoop, ...]):
        self.client = client
        self.status = status
        self.encoders = encoders

        self.status.set('modo', 'Autonomo')

        self.estado = EstadoAquisicaoTempo(client, self.status, self.encoders, 10, '')

    def stop(self):
        pass

    def run(self):
        self.estado.run()

    def handle_event(self, ev):
        pass
