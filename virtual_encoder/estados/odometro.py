import threading
import time
from typing import TYPE_CHECKING

import numpy as np

from virtual_encoder.estados import Estado

if TYPE_CHECKING:
    from virtual_encoder.virtual_encoder import VirtualEncoder

class EstadoReadyOdometro(Estado):
    def __init__(self, ve: "VirtualEncoder"):
        self.ve = ve

        self.center_position = np.array([0., 0.])
        self.position_now = np.array([0., 0.])

        self.ve.set("estado", "Ready")

    def run(self, pending_displacement):
        step = 1 / self.ve.spatial_resolution

        for i in range(2):
            if pending_displacement[i] > step:
                self.ve.encoders[i].send_pulse("+")
                self.position_now[i] += 1
                pending_displacement[i] -= step

            elif pending_displacement[i] < step:
                self.ve.encoders[i].send_pulse("-")
                self.position_now[i] += 1
                pending_displacement[i] += step

        travel_vec = self.position_now - self.center_position
        travel_dist = np.linalg.norm(travel_vec)
        if travel_dist > 3:
            step_dir = travel_vec / travel_dist
            self.center_position += step_dir
            self.ve.encoders[2].send_pulse("+")

        time.sleep(0.001)

        return pending_displacement


class EstadoAquisicaoOdometro(EstadoReadyOdometro):
    def __init__(self, ve: "VirtualEncoder", reason: str):
        self.ve = ve
        self.reason = reason

        self.ve.set("estado", "Aquisicao")
        self.ve.add_message(f"Aquisição: {self.reason} estimativa tempo real")

        timestamp_ns = time.time_ns()

        def start_acquisition_helper():
            self.ve.acquisition_writer.start_acquisition(
                timestamp_ns, self.reason, 0
            )

        req_thread = threading.Thread(target=start_acquisition_helper, daemon=True)

        time.sleep(1)
        for encoder in self.ve.encoders:
            encoder.send_pulse()

        req_thread.start()

    def stop(self):
        self.ve.set("estado", "Gravando...")
        self.ve.acquisition_writer.stop_acquisition()
        self.ve.set("estado", "Aquisicao")
