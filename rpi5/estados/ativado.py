from ..pi_zero_client import PiZeroClient

from visual_odometer import VisualOdometer

import numpy as np
import cv2
from PIL import Image, ImageOps

def grayscale(frame: cv2.Mat) -> np.ndarray:
    cv2_img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    img_array_rgb = Image.fromarray(cv2_img)
    img_grayscale = ImageOps.grayscale(img_array_rgb)
    img_array = np.asarray(img_grayscale)
    return img_array

class EstadoAtivado:
    def __init__(self, client: PiZeroClient, odometer: VisualOdometer):
        print('Ativado!')
        self.client = client
        self.odometer = odometer

        img = grayscale(self.client.get_img())
        self.odometer.feed_image(img)

    def run(self):
        frame = self.client.get_img()

        img = grayscale(frame)
        self.odometer.feed_image(img)
        deltax, deltay = self.odometer.estimate_last_displacement()

        print(f"Frame:  delta:[{deltax:>5.2f},{deltay:>5.2f}]")
        return None
