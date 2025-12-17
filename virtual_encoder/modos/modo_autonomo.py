from virtual_encoder.estados import EstadoAquisicaoTempo
from virtual_encoder.encoder_gs import EncoderGS


class ModoAutonomo:
    def __init__(self, gs: EncoderGS):
        self.gs = gs

        self.gs.set("modo", "Autonomo")

        self.estado = EstadoAquisicaoTempo(self.gs, 10, "")

    def stop(self):
        pass

    def run(self):
        self.estado.run()

    def handle_event(self, ev):
        pass
