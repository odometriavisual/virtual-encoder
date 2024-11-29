from visual_odometer import VisualOdometer
from PIL import Image, ImageOps
import numpy as np

from ..ihm.ihm import IHM
from ..pi_zero_client import PiZeroClient
from ..pulse_generator import PulseGenerator
from ..logger import Logger

from ..estados import EstadoSet, EstadoErro, EstadoCalibracao, EstadoAquisicaoOdometro

def to_grayscale(img):
    return np.asarray(ImageOps.grayscale(Image.fromarray(img)))

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
        self.estado.stop()

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
                self.estado.stop()
                self.estado = EstadoSet(self.ihm)
