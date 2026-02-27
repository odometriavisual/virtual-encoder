import threading
import time

from virtual_encoder.estados import Estado
from virtual_encoder.encoder_gs import EncoderGS


class EstadoAquisicaoOdometro(Estado):
    def __init__(self, gs: EncoderGS, reason: str):
        self.gs = gs
        self.reason = reason

        self.gs.set("estado", "Aquisicao")
        self.gs.add_message(f"Aquisição: {self.reason} estimativa tempo real")

        self.is_first_pulse = True

    def stop(self):
        self.gs.set("estado", "Gravando...")
        self.gs.acquisition_writer.stop_acquisition()
        self.gs.set("estado", "Aquisicao")

    def run(self):
        if self.is_first_pulse:
            self.is_first_pulse = False

            timestamp_ns = time.time_ns()

            def start_acquisition_helper():
                self.gs.acquisition_writer.start_acquisition(
                    timestamp_ns, self.reason, 0
                )

            req_thread = threading.Thread(target=start_acquisition_helper, daemon=True)

            for encoder in self.gs.encoders:
                encoder.send_pulse()

            req_thread.start()
        else:
            if self.pending_pulses[0] > 1:
                self.gs.encoders[0].send_pulse("+")
                self.pending_pulses[0] -= 1

            if self.pending_pulses[1] > 1:
                self.gs.encoders[1].send_pulse("+")
                self.pending_pulses[1] -= 1

            if self.pending_pulses[0] < 1:
                self.gs.encoders[0].send_pulse("-")
                self.pending_pulses[0] += 1

            if self.pending_pulses[1] < 1:
                self.gs.encoders[1].send_pulse("-")
                self.pending_pulses[1] += 1

        time.sleep(0.001)
