from visual_odometer import VisualOdometer

from virtual_encoder.estados import EstadoAquisicaoOdometro, EstadoErro, EstadoReady
from virtual_encoder.encoder_gs import EncoderGS
from virtual_encoder.dsp import to_grayscale


class ModoOdometro:
    def __init__(self, gs: EncoderGS):
        self.gs = gs

        self.gs.set("modo", "Odometro")

        self.estado = EstadoReady(self.gs)

        img = to_grayscale(self.gs.camera.get_img())
        self.odometer = VisualOdometer(img.shape)

        # Fill odometer buffers
        self.odometer.feed_image(img)
        self.odometer.feed_image(img)

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

            case EstadoReady(), (
                "start_acquisition",
                _,
                reason,
            ):  # ESTADO, PULSOS P/ SEG, REASON
                self.estado = EstadoAquisicaoOdometro(self.gs, self.odometer, reason)

            case EstadoAquisicaoOdometro(), "stop_acquisition":
                self.estado.stop()
                self.estado = EstadoReady(self.gs)
