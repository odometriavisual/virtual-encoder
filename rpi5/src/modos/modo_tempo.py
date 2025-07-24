from ..estados import EstadoReady, EstadoErro, EstadoAquisicaoTempo
from ..encoder_gs import EncoderGS


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

            case EstadoErro(), "next_estado":
                self.estado = EstadoReady(self.gs)

            case EstadoReady(), ("next_estado", _, pulses_frequency, reason):
                self.estado = EstadoAquisicaoTempo(
                    self.gs, int(pulses_frequency), reason
                )

            case EstadoAquisicaoTempo(), "next_estado":
                self.estado.stop()
                self.estado = EstadoReady(self.gs)

            case _, "toggle_stream":
                self.gs.pi_zero_api.toggle_stream()
