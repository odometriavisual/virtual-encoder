from virtual_encoder.estados import EstadoReady, EstadoErro, EstadoAquisicaoTempo
from virtual_encoder.virtual_encoder import VirtualEncoder


class ModoTempo:
    def __init__(self, ve: VirtualEncoder):
        self.ve = ve

        self.ve.set("modo", "Tempo")

        self.estado = EstadoReady(self.ve)

    def stop(self):
        self.estado.stop()

    def run(self):
        self.estado.run()

    def handle_event(self, ev):
        match self.estado, ev:
            case _, ("Erro", message):
                self.estado = EstadoErro(self.ve, message)

            case EstadoErro(), "return_from_error":
                self.estado = EstadoReady(self.ve)

            case EstadoReady(), ("start_acquisition", pulses_frequency, reason):
                self.estado = EstadoAquisicaoTempo(
                    self.ve, int(pulses_frequency), reason
                )

            case EstadoAquisicaoTempo(), "stop_acquisition":
                self.estado.stop()
                self.estado = EstadoReady(self.ve)
