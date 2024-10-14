import threading
import time
from os.path import isdir

import cv2
import numpy as np
import requests
from requests.exceptions import RequestException

PIZERO_HOST = 'http://raspberrypi00.local:7123'

class PiZeroClient:
    def __init__(self):
        self.vid = cv2.VideoCapture()
        self.vid_lock = threading.Lock()
        self.frame = cv2.Mat(np.zeros((1, 1), dtype=np.float32))

        # def update():
        #     while True:
        #         time.sleep(0.001)
        #         if self.vid.isOpened():
        #             ret, frame = self.vid.read()

        #             if ret:
        #                 with self.vid_lock:
        #                     self.frame = frame

        #                 imgs_directory = '/home/pi/picam_imgs'
        #                 filename = f'{imgs_directory}/{time.monotonic_ns()}.jpg'
        #                 cv2.imwrite(filename, self.frame)
        #         else:
        #             self.vid.open(f'{PIZERO_HOST}/stream.mjpg')
        #             self.vid.set(cv2.CAP_PROP_BUFFERSIZE, 1)
        #             time.sleep(1)

        # self.vid_thread = threading.Thread(daemon=True, target=update)
        # self.vid_thread.start()

    def set_focus(self, focus: float):
        try:
            requests.get(f'{PIZERO_HOST}/focus/{focus}', timeout=1.0)
            return True
        except RequestException:
            return False

    def set_exposure(self, exposure: int):
        try:
            requests.get(f'{PIZERO_HOST}/exposure/{exposure}', timeout=1.0)
            return True
        except RequestException:
            return False

    def get_orientation(self) -> [float, float, float, float, float, float]:
        try:
            res = requests.get(f'{PIZERO_HOST}/imu', timeout=1.0)
            if res.status_code == 200:
                return res.text.strip().split(',')
        except (RequestException, ValueError):
            return False

    def get_img(self) -> cv2.Mat:
        # if not self.vid.isOpened():
        #     self.vid.open(f'{PIZERO_HOST}/stream.mjpg')
        #     self.vid.set(cv2.CAP_PROP_BUFFERSIZE, 1)
        #     time.sleep(1)

        with self.vid_lock:
            frame = self.frame.copy()

        return frame

    def get_status(self, local_status):
        try:
            status = requests.get(f'{PIZERO_HOST}/status?rpi5status={local_status}', timeout=1.0).json()
            status['rpiZero'] = True
        except RequestException:
            status = {
                'rpiZero': False,
                'imu': False,
                'camera': False,
            }

        return status

    def download_all_images(self):
        raise NotImplemented

    def delete_all_images(self):
        raise NotImplemented