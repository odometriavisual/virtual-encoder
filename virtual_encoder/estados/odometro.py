import threading
import time

from virtual_encoder.estados import Estado
from virtual_encoder.encoder_gs import EncoderGS

class EstadoReadyOdometro(Estado):
    def __init__(self, gs: EncoderGS):
        self.gs = gs

        self.gs.set("estado", "Ready")

    def run(self, pending_pulses):
        for i in range(2):
            if pending_pulses[i] > 10:
                self.gs.encoders[i].send_pulse("+")
                pending_pulses[i] -= 10

            elif pending_pulses[i] < 10:
                self.gs.encoders[i].send_pulse("-")
                pending_pulses[i] += 10

        time.sleep(0.001)

        return pending_pulses


class EstadoAquisicaoOdometro(Estado):
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

    def run(self, pending_pulses):
        for i in range(2):
            if pending_pulses[i] > 10:
                self.gs.encoders[i].send_pulse("+")
                pending_pulses[i] -= 10
            elif pending_pulses[i] < 10:
                self.gs.encoders[i].send_pulse("-")
                pending_pulses[i] += 10

        time.sleep(0.001)

        return pending_pulses
