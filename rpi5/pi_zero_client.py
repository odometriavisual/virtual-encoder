from numpy import integer
import cv2
import requests
import threading
import time

PIZERO_HOST = 'http://raspberrypi00.local:7123'

class PiZeroClient:
    video_stream = None

    def set_focus(self, focus: int):
        requests.get(f'{PIZERO_HOST}/focus.html/{focus}')

    def set_exposure(self, exposure: int):
        requests.get(f'{PIZERO_HOST}/exposure.html/{exposure}')

    def get_orientation(self) -> [float, float, float, float]:
        return requests.get(f'{PIZERO_HOST}/imu.html').text.strip().split(',')

    #def get_mjpeg_stream(self) -> cv2.VideoCapture:
    #    return cv2.VideoCapture(f'{PIZERO_HOST}/stream.mjpg')
    # Será substituido pela classe ImageStream

    def download_all_images(self):
        raise NotImplemented

    def delete_all_images(self):
        raise NotImplemented


class ImageStream:
    def __init__(self):
        self.vid = cv2.VideoCapture(f'{PIZERO_HOST}/stream.mjpg')
        self.vid.set(cv2.CAP_PROP_BUFFERSIZE, 1)
        self.frame = None
        self.stopped = False

        if not self.vid.isOpened():
            raise Exception(f"Falha ao abrir o stream MJPEG em {PIZERO_HOST}")

        threading.Thread(target=self.update, args=()).start()

    def update(self):
        while not self.stopped:
            _ret, self.frame = self.vid.read()
            time.sleep(0.01)

    def get_img(self) -> cv2.Mat:
        return self.frame

    def stop(self):
        self.stopped = True
        self.vid.release()
