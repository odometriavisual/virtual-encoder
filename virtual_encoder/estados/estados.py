import time
from abc import abstractmethod
from threading import Thread

from ..encoder_gs import EncoderGS


class Estado:
    def stop(self):
        pass

    @abstractmethod
    def run(self):
        pass


class EstadoSet(Estado):
    def __init__(self, status: EncoderGS):
        status.set("estado", "Set")

    def run(self):
        time.sleep(0.001)


class EstadoReady(Estado):
    def __init__(self, status: EncoderGS):
        status.set("estado", "Ready")

    def run(self):
        time.sleep(0.001)


class EstadoAquisicaoTempo(Estado):
    def __init__(self, gs: EncoderGS, pulses_frequency: int, reason: str):
        self.gs = gs
        self.reason = reason

        self.is_first_pulse = True

        self.gs.set("estado", "Aquisicao")
        self.gs.add_message(f"Aquisição: {reason} {pulses_frequency} pulsos/s")

        self.period = 1_000_000_000 // pulses_frequency
        self.next_time = time.time_ns() + self.period

    def stop(self):
        self.gs.acquisition_writer.stop_acquisition()

    def run(self):
        if self.is_first_pulse:
            self.is_first_pulse = False

            timestamp_ns = time.time_ns()

            def start_acquisition_helper():
                self.gs.acquisition_writer.start_acquisition(
                    timestamp_ns, self.reason, self.period
                )

            req_thread = Thread(target=start_acquisition_helper, daemon=True)

            timestamp_ns = time.time_ns()
            for encoder in self.gs.encoders:
                encoder.send_pulse()

            req_thread.start()

            self.next_time = timestamp_ns + self.period
        else:
            current_time = time.time_ns()
            if current_time > self.next_time:
                for encoder in self.gs.encoders:
                    encoder.send_pulse()

                self.next_time = self.next_time + self.period

        time.sleep(0.0001)


class EstadoErro(Estado):
    def __init__(self, gs: EncoderGS, message):
        self.gs = gs

        self.gs.set("estado", message)

        self.time_now = time.time_ns()
        self.time_exit = self.time_now + int(5e9)

    def run(self):
        self.time_now = time.time_ns()
        if self.time_now > self.time_exit:
            self.gs.send_event("return_from_error")
        else:
            time.sleep(0.5)
