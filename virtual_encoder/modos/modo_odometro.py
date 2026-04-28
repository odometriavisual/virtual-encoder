import threading
import multiprocessing
import numpy as np

from visual_odometer import VisualOdometer

from virtual_encoder.estados import (
    EstadoAquisicaoOdometro,
    EstadoErro,
    EstadoReadyOdometro,
)
from virtual_encoder.encoder_gs import EncoderGS
from virtual_encoder.dsp import to_grayscale


class ModoOdometro:
    def __init__(self, gs: EncoderGS):
        self.gs = gs

        self.gs.set("modo", "Odometro")

        self.estado = EstadoReadyOdometro(self.gs)

        img = to_grayscale(self.gs.camera.get_img())
        self.odometer = VisualOdometer(
            img.shape, frequency_window_params={"factor": 0.1}, async_mode=True
        )

        # Fill odometer buffers
        self.odometer.feed_image(img)
        self.odometer.feed_image(img)

        # Odometer syncronization
        self.new_image_event = multiprocessing.Event()
        self.is_running = True

        self.pending_displacement = np.zeros(2)
        self.acc = np.zeros(2)

        def _preprocess_last_img():
            while self.is_running:
                self.odometer.feed_image(to_grayscale(self.gs.camera.get_img()))
                self.new_image_event.set()

        def _estimate_distance():
            self.new_image_event.clear()

            while self.is_running:
                self.new_image_event.wait()
                self.new_image_event.clear()

                try:
                    new_displacement = np.array(self.odometer.get_displacement()) * self.gs.spatial_resolution
                except ValueError:
                    new_displacement = (0, 0)

                if self.is_running:
                    # Checking again to avoid setting status after is_running was set to False
                    self.gs.set("pos", {"x": self.acc[0], "y": self.acc[1]})

                self.pending_displacement += new_displacement
                self.acc += new_displacement

        self.preprocess_thread = threading.Thread(
            target=_preprocess_last_img, daemon=True
        ).start()
        self.estimate_thread = threading.Thread(
            target=_estimate_distance, daemon=True
        ).start()

    def stop(self):
        self.is_running = False
        self.estado.stop()

    def run(self):
        match self.estado:
            case EstadoReadyOdometro() | EstadoAquisicaoOdometro():
                self.pending_displacement = self.estado.run(self.pending_displacement)
            case _:
                self.estado.run()

    def handle_event(self, ev):
        match self.estado, ev:
            case _, "reset_position":
                self.acc = np.zeros(2)

            case _, ("Erro", message):
                self.estado = EstadoErro(self.gs, message)

            case EstadoErro(), "return_from_error":
                self.estado = EstadoReadyOdometro(self.gs)

            case EstadoReadyOdometro(), (
                "start_acquisition",
                _,
                reason,
            ):  # ESTADO, PULSOS P/ SEG, REASON
                self.estado = EstadoAquisicaoOdometro(self.gs, reason)
                self.pending_displacement = np.zeros(2)
                self.acc = np.zeros(2)

            case EstadoAquisicaoOdometro(), "stop_acquisition":
                self.estado.stop()
                self.estado = EstadoReadyOdometro(self.gs)
