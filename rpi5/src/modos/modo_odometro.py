from visual_odometer import VisualOdometer
from PIL import Image, ImageOps
import numpy as np

from ..ihm.ihm import IHM
from ..pi_zero_client import PiZeroClient
from ..pulse_generator import PulseGenerator
from ..status import EncoderStatus

from ..estados import EstadoReady, EstadoErro, EstadoAquisicaoOdometro

def to_grayscale(img):
    return np.asarray(ImageOps.grayscale(Image.fromarray(img)))

class ModoOdometro:
    def __init__(self, client: PiZeroClient, ihm: IHM, status: EncoderStatus, encoders: tuple[PulseGenerator, ...]):
        self.client = client
        self.ihm = ihm
        self.status = status
        self.encoders = encoders

        self.status.set('modo', 'Odometro')

        self.estado = EstadoReady(self.status)

        img = to_grayscale(self.client.get_img())
        self.odometer = VisualOdometer(img.shape)

        # Fill odometer buffers
        self.odometer.feed_image(img)
        self.odometer.feed_image(img)

    def stop(self):
        self.estado.stop()

    def run(self):
        self.estado.run()

    def handle_event(self, ev):
        match self.estado, ev:
            case _, ('Erro', message):
                self.estado = EstadoErro(self.ihm, self.status, message)

            case EstadoErro(), 'next_estado':
                self.estado = EstadoReady(self.status)

            case EstadoReady(), ('next_estado', _, _, reason): # next_estado, ESTADO, PULSOS P/ SEG, REASON
                self.estado = EstadoAquisicaoOdometro(self.client, self.ihm, self.status, self.encoders, self.odometer, reason)

            case EstadoAquisicaoOdometro(), 'next_estado':
                self.estado.stop()
                self.estado = EstadoReady(self.status)
