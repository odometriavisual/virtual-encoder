from visual_odometer import VisualOdometer
import time
import threading

from PIL import Image, ImageOps
import numpy as np

from ..ihm.ihm import IHM
from ..pi_zero_client import PiZeroClient
from ..pulse_generator import PulseGenerator
from ..logger import Logger

from ..estados import *

def to_grayscale(img):
    return np.asarray(ImageOps.grayscale(Image.fromarray(img)))

class EstadoAquisicaoOdometro:
    def __init__(self, client: PiZeroClient, ihm: IHM, encoders: tuple[PulseGenerator, ...], odometer: VisualOdometer, logger: Logger):
        self.client = client
        self.ihm = ihm
        self.encoders = encoders
        self.odometer = odometer
        self.logger = logger
        self.logger.start()

        self.ihm.estado = 'Aquisicao'
        self.ihm.update_display()

        img = to_grayscale(self.client.get_img())
        self.odometer.feed_image(img)
        self.odometer.feed_image(img)

        self.new_image_event = threading.Event()

        self.pulses_lock = threading.Lock()
        self.pending_pulses = [0, 0]

        self.is_running = True

        def _preprocess_last_img():
            while self.is_running:
                self.client.vid_event.wait()
                self.client.vid_event.clear()

                self.odometer.feed_image(to_grayscale(self.client.get_img()))

                self.new_image_event.set()

        self.preprocess_thread = threading.Thread(target=_preprocess_last_img, daemon=True).start()

        def _estimate_distance():
            self.new_image_event.clear()
            acc = [0., 0.]

            while self.is_running:
                self.new_image_event.wait()
                self.new_image_event.clear()

                t0 = time.time()
                try:
                    new_pulses = self.odometer.get_displacement()
                except ValueError:
                    new_pulses = (0, 0)
                self.ihm.estado = f' Deslocamento: {acc[0]:.2f}, {acc[1]:.2f}'
                print(f'fps {1/(time.time()-t0):06.02f}, acumulado {acc[0]: 6.02f} {acc[1]: 6.02f}')

                with self.pulses_lock:
                    self.pending_pulses[0] += new_pulses[0]
                    self.pending_pulses[1] += new_pulses[1]

                acc[0] += new_pulses[0]
                acc[1] += new_pulses[1]
                self.logger.log(new_pulses)

        self.estimate_thread = threading.Thread(target=_estimate_distance, daemon=True).start()

    def __del__(self):
        self.is_running = False
        self.logger.reset()

    def run(self):
        with self.pulses_lock:
            if self.pending_pulses[0] > 1:
                self.encoders[0].send_pulses(1)
                self.pending_pulses[0] -= 1

            if self.pending_pulses[1] > 1:
                self.encoders[1].send_pulses(1)
                self.pending_pulses[1] -= 1

        time.sleep(0.001)

class ModoOdometro:
    def __init__(self, client: PiZeroClient, ihm: IHM, encoders: tuple[PulseGenerator, ...], logger: Logger):
        self.ihm = ihm
        self.ihm.modo = 'Odometro'

        self.encoders = encoders
        self.client = client

        self.estado = EstadoSet(self.ihm)
        self.odometer = VisualOdometer((480, 640))
        self.logger = logger

    def stop(self):
        self.estado.is_running = False

    def run(self):
        self.estado.run()

    def handle_event(self, ev):
        match self.estado, ev:
            case _, ('Erro', message):
                self.estado = EstadoErro(self.ihm, message)

            case EstadoErro(), 'next_estado':
                self.estado = EstadoSet(self.ihm)

            case EstadoSet(), 'next_estado':
                self.estado = EstadoAquisicaoOdometro(self.client, self.ihm, self.encoders, self.odometer, self.logger)

            case EstadoAquisicaoOdometro(), 'next_estado':
                self.estado.is_running = False
                self.estado = EstadoSet(self.ihm)
