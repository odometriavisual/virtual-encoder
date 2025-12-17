from virtual_encoder.estados import EstadoReady, EstadoErro, EstadoAquisicaoTempo
from virtual_encoder.encoder_gs import EncoderGS


class ModoTempo:
    def __init__(self, gs: EncoderGS):
        self.gs = gs

        self.gs.set("modo", "Tempo")

        self.estado = EstadoReady(self.gs)

    def stop(self):
        self.estado.stop()

    def run(self):
        self.estado.run()

    def handle_event(self, ev):
        match self.estado, ev:
            case _, ("Erro", message):
                self.estado = EstadoErro(self.gs, message)

            case EstadoErro(), "return_from_error":
                self.estado = EstadoReady(self.gs)

            case EstadoReady(), ("start_acquisition", pulses_frequency, reason):
                self.estado = EstadoAquisicaoTempo(
                    self.gs, int(pulses_frequency), reason
                )

            case EstadoAquisicaoTempo(), "stop_acquisition":
                self.estado.stop()
                self.estado = EstadoReady(self.gs)
