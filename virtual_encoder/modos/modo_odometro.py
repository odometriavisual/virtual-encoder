import time
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
            img.shape, frequency_window_params={"factor": 0.2}, async_mode=True
        )

        # Fill odometer buffers
        self.odometer.feed_image(img)
        self.odometer.feed_image(img)

        # Odometer syncronization
        self.new_image_event = multiprocessing.Event()
        self.is_running = True

        self.pending_pulses = np.zeros(2)
        self.acc = np.zeros(2)

        def _preprocess_last_img():
            last_t = time.time()
            while self.is_running:
                self.odometer.feed_image(to_grayscale(self.gs.camera.get_img()))
                t1 = time.time()
                dt = (t1 - last_t) * 1000
                last_t = t1
                # print(f"camera {dt=:.3f} ms")

                self.new_image_event.set()

        def _estimate_distance():
            self.new_image_event.clear()

            while self.is_running:
                self.new_image_event.wait()
                self.new_image_event.clear()

                t0 = time.time()
                try:
                    new_pulses = self.odometer.get_displacement()
                except ValueError:
                    new_pulses = (0, 0)
                t1 = time.time()

                if self.is_running:
                    # Checking again to avoid setting status after is_running was set to False
                    self.gs.set("pos", {"x": self.acc[0], "y": self.acc[1]})
                    dt = (t1 - t0) * 1000
                    # print(
                    #     f"deslocamento {dt=:.3f}, acumulado {self.acc[0]: 6.02f} {self.acc[1]: 6.02f}"
                    # )

                self.pending_pulses += new_pulses
                self.acc += new_pulses

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
                self.pending_pulses = self.estado.run(self.pending_pulses)
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
                self.pending_pulses = np.zeros(2)
                self.acc = np.zeros(2)

            case EstadoAquisicaoOdometro(), "stop_acquisition":
                self.estado.stop()
                self.estado = EstadoReadyOdometro(self.gs)
