from visual_odometer import VisualOdometer
from PIL import Image, ImageOps
import numpy as np

from ..ihm.ihm import IHM
from ..pi_zero_client import PiZeroClient
from ..pulse_generator import PulseGenerator
from ..logger import Logger

from ..estados import EstadoSet, EstadoReady, EstadoErro, EstadoCalibracao, EstadoAquisicaoOdometro

def to_grayscale(img):
    return np.asarray(ImageOps.grayscale(Image.fromarray(img)))

class ModoOdometro:
    def __init__(self, client: PiZeroClient, ihm: IHM, status: dict, encoders: tuple[PulseGenerator, ...], logger: Logger):
        self.client = client
        self.ihm = ihm
        self.status = status
        self.encoders = encoders
        self.logger = logger

        self.status['modo'] = 'Odometro'

        self.estado = EstadoSet(self.status)
        self.odometer = VisualOdometer((480, 640))

    def stop(self):
        self.estado.stop()

    def run(self):
        self.estado.run()

    def handle_event(self, ev):
        match self.estado, ev:
            case _, ('Erro', message):
                self.estado = EstadoErro(self.ihm, self.status, message)

            case EstadoErro(), 'next_estado':
                self.estado = EstadoSet(self.status)

            case EstadoSet(), 'next_estado':
                self.estado = EstadoCalibracao(self.ihm, self.status, self.client)

            case EstadoCalibracao(), 'fim_calibracao':
                self.estado = EstadoReady(self.status)

            case EstadoReady(), ('next_estado', _, _):
                self.estado = EstadoAquisicaoOdometro(self.client, self.ihm, self.status, self.encoders, self.odometer, self.logger)

            case EstadoAquisicaoOdometro(), 'next_estado':
                self.estado.stop()
                self.estado = EstadoSet(self.status)
