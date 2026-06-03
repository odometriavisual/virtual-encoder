import time
from abc import abstractmethod
from threading import Thread

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from virtual_encoder.virtual_encoder import VirtualEncoder


class Estado:
    def stop(self):
        pass

    @abstractmethod
    def run(self):
        pass


class EstadoSet(Estado):
    def __init__(self, ve: "VirtualEncoder"):
        ve.set("estado", "Set")

    def run(self):
        time.sleep(0.001)


class EstadoReady(Estado):
    def __init__(self, ve: "VirtualEncoder"):
        ve.set("estado", "Ready")

    def run(self):
        time.sleep(0.001)


class EstadoAquisicaoTempo(Estado):
    def __init__(self, ve: "VirtualEncoder", pulses_frequency: int, reason: str):
        self.ve = ve
        self.reason = reason

        self.is_first_pulse = True

        self.ve.set("estado", "Aquisicao")

        self.period = 1_000_000_000 // pulses_frequency
        self.next_time = time.time_ns() + self.period

    def stop(self):
        self.ve.set("estado", "Gravando...")
        self.ve.acquisition_writer.stop_acquisition()
        self.ve.set("estado", "Aquisicao")

    def run(self):
        if self.is_first_pulse:
            self.is_first_pulse = False

            timestamp_ns = time.time_ns()

            def start_acquisition_helper():
                self.ve.acquisition_writer.start_acquisition(
                    timestamp_ns, self.reason, self.period
                )

            req_thread = Thread(target=start_acquisition_helper, daemon=True)

            timestamp_ns = time.time_ns()
            for encoder in self.ve.encoders:
                encoder.send_pulse()

            req_thread.start()

            self.next_time = timestamp_ns + self.period
        else:
            current_time = time.time_ns()
            if current_time > self.next_time:
                for encoder in self.ve.encoders:
                    encoder.send_pulse()

                self.next_time = self.next_time + self.period

        time.sleep(0.0001)


class EstadoErro(Estado):
    def __init__(self, ve: "VirtualEncoder", message):
        self.ve = ve

        self.ve.set("estado", message)

        self.time_now = time.time_ns()
        self.time_exit = self.time_now + int(5e9)

    def run(self):
        self.time_now = time.time_ns()
        if self.time_now > self.time_exit:
            self.ve.send_event("return_from_error")
        else:
            time.sleep(0.5)
