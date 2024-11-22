from visual_odometer import VisualOdometer
import time
import threading

from ..ihm.ihm import IHM
from ..pi_zero_client import PiZeroClient
from ..pulse_generator import PulseGenerator

from ..estados import *

class EstadoAquisicaoOdometro:
    def __init__(self, client: PiZeroClient, ihm: IHM, encoders: tuple[PulseGenerator, ...], odometer: VisualOdometer):
        self.client = client
        self.ihm = ihm
        self.encoders = encoders
        self.odometer = odometer

        self.ihm.estado = 'Aquisicao'
        self.ihm.update_display()

        self.odometer.feed_image(self.client.get_img())

        self.pulses_lock = threading.Lock()
        self.pending_pulses = [0, 0]

        self.is_running = True

        def _preprocess_last_img():
            while self.is_running:
                self.odometer.feed_image(self.client.get_img())
                time.sleep(1 / 30)
        self.preprocess_thread = threading.Thread(target=_preprocess_last_img).start()

        def _estimate_distance():
            while self.is_running:
                new_pulses = self.odometer.get_displacement()
                with self.pulses_lock:
                    self.pending_pulses[0] += new_pulses[0]
                    self.pending_pulses[1] += new_pulses[1]
        self.estimate_thread = threading.Thread(target=_estimate_distance).start()

    def __del__(self):
        self.is_running = False

    def run(self):
        with self.pulses_lock:
            if self.pending_pulses[0] > 0:
                self.encoders[0].send_pulses(1)
                self.pending_pulses[0] -= 1

            if self.pending_pulses[1] > 0:
                self.encoders[1].send_pulses(1)
                self.pending_pulses[1] -= 1

        time.sleep(0.001)

class ModoTempo:
    def __init__(self, client: PiZeroClient, ihm: IHM, encoders: tuple[PulseGenerator, ...]):
        self.ihm = ihm
        self.ihm.modo = 'Odometro'

        self.encoders = encoders
        self.client = client

        self.estado = EstadoSet(self.ihm)
        self.odometer = VisualOdometer((640, 480))

    def run(self):
        self.estado.run()

    def handle_event(self, ev):
        match self.estado, ev:
            case _, ('Erro', message):
                self.estado = EstadoErro(self.ihm, message)

            case EstadoErro(), 'next_estado':
                self.estado = EstadoSet(self.ihm)

            case EstadoSet(), 'next_estado':
                self.estado = EstadoCalibracao(self.ihm, self.client)

            case EstadoCalibracao(), 'fim_calibracao':
                self.estado = EstadoReady(self.ihm)

            case EstadoReady(), 'next_estado':
                self.estado = EstadoAquisicaoOdometro(self.client, self.ihm, self.encoders, self.odometer)

            case EstadoAquisicaoOdometro(), 'next_estado':
                self.estado.is_running = False
                self.estado = EstadoSet(self.ihm)
