import threading
import time

import numpy as np

from virtual_encoder.estados import Estado
from virtual_encoder.encoder_gs import EncoderGS

class EstadoReadyOdometro(Estado):
    def __init__(self, gs: EncoderGS):
        self.gs = gs

        self.center_position = np.array([0., 0.])
        self.position_now = np.array([0., 0.])

        self.gs.set("estado", "Ready")

    def run(self, pending_displacement):
        step = 1 / self.gs.spatial_resolution

        for i in range(2):
            if pending_displacement[i] > step:
                self.gs.encoders[i].send_pulse("+")
                self.position_now[i] += 1
                pending_displacement[i] -= step

            elif pending_displacement[i] < step:
                self.gs.encoders[i].send_pulse("-")
                self.position_now[i] += 1
                pending_displacement[i] += step

        travel_vec = self.position_now - self.center_position
        travel_dist = np.linalg.norm(travel_vec)
        if travel_dist > 3:
            step_dir = travel_vec / travel_dist
            self.center_position += step_dir
            self.gs.encoders[2].send_pulse("+")

        time.sleep(0.001)

        return pending_displacement


class EstadoAquisicaoOdometro(EstadoReadyOdometro):
    def __init__(self, gs: EncoderGS, reason: str):
        self.gs = gs
        self.reason = reason

        self.gs.set("estado", "Aquisicao")
        self.gs.add_message(f"Aquisição: {self.reason} estimativa tempo real")

        timestamp_ns = time.time_ns()

        def start_acquisition_helper():
            self.gs.acquisition_writer.start_acquisition(
                timestamp_ns, self.reason, 0
            )

        req_thread = threading.Thread(target=start_acquisition_helper, daemon=True)

        time.sleep(1)
        for encoder in self.gs.encoders:
            encoder.send_pulse()

        req_thread.start()

    def stop(self):
        self.gs.set("estado", "Gravando...")
        self.gs.acquisition_writer.stop_acquisition()
        self.gs.set("estado", "Aquisicao")
