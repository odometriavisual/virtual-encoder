import time
from abc import abstractmethod
from threading import Thread

from ..hal.encoder import EncoderNoop
from ..ihm.ihm import IHM
from ..pi_zero_client import PiZeroClient
from ..status import EncoderStatus


class Estado:
    def stop(self):
        pass

    @abstractmethod
    def run(self):
        pass

class EstadoSet(Estado):
    def __init__(self, status: EncoderStatus):
        status.set('estado', 'Set')

    def run(self):
        time.sleep(0.001)

class EstadoReady(Estado):
    def __init__(self, status: EncoderStatus):
        status.set('estado', 'Ready')

    def run(self):
        time.sleep(0.001)

class EstadoAquisicaoTempo(Estado):
    def __init__(self, client: PiZeroClient, status: EncoderStatus, encoders: tuple[EncoderNoop, ...], pulses_frequency: int, reason: str):
        self.encoders = encoders
        self.client = client
        self.reason = reason

        self.is_first_pulse = True

        status.set('estado', 'Aquisicao')
        status.add_message(f'Aquisição: {reason} {pulses_frequency} pulsos/s')

        self.period = 1_000_000_000 // pulses_frequency
        self.next_time = time.time_ns() + self.period

    def stop(self):
        self.client.stop_acquisition()

    def run(self):
        if self.is_first_pulse:
            self.is_first_pulse = False

            timestamp_ns = time.time_ns()
            def start_acquisition_helper():
                self.client.start_acquisition(timestamp_ns, self.reason, self.period)
            req_thread = Thread(target=start_acquisition_helper, daemon=True)

            timestamp_ns = time.time_ns()
            for encoder in self.encoders:
                encoder.send_pulse()

            req_thread.start()

            self.next_time = timestamp_ns + self.period
        else:
            current_time = time.time_ns()
            if current_time > self.next_time:
                for encoder in self.encoders:
                    encoder.send_pulse()

                self.next_time = self.next_time + self.period

        time.sleep(0.0001)

class EstadoErro(Estado):
    def __init__(self, ihm: IHM, status: EncoderStatus, message):
        self.ihm = ihm

        status.set('estado', message)

        self.time_now = time.time_ns()
        self.time_exit = self.time_now + int(5e9)

    def run(self):
        self.time_now = time.time_ns()
        if self.time_now > self.time_exit:
            self.ihm.send_event('next_estado')
        else:
            time.sleep(0.5)
