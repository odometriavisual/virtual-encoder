from numpy import integer

import cv2
import requests

PIZERO_HOST = 'http://raspberrypi00.local:7123'

class PiZeroClient:
    video_stream = None

    def set_focus(self, focus: int):
        requests.get(f'{PIZERO_HOST}/focus.html/{focus}')

    def set_exposure(self, exposure: int):
        requests.get(f'{PIZERO_HOST}/exposure.html/{exposure}')

    def get_orientation(self) -> [float, float, float, float]:
        return requests.get(f'{PIZERO_HOST}/imu.html').text.strip().split(',')

    def get_mjpeg_stream(self) -> cv2.VideoCapture:
        return cv2.VideoCapture(f'{PIZERO_HOST}/stream.mjpg')

    def download_all_images(self):
        raise NotImplemented

    def delete_all_images(self):
        raise NotImplemented