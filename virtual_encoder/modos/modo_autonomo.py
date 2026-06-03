from virtual_encoder.estados import EstadoAquisicaoTempo
from virtual_encoder.virtual_encoder import VirtualEncoder


class ModoAutonomo:
    def __init__(self, ve: VirtualEncoder):
        self.ve = ve

        self.ve.set("modo", "Autonomo")

        self.estado = EstadoAquisicaoTempo(self.ve, 10, "")

    def stop(self):
        pass

    def run(self):
        self.estado.run()

    def handle_event(self, ev):
        pass
