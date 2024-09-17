import cv2
import requests
import threading
import time

PIZERO_HOST = 'http://raspberrypi00.local:7123'

class PiZeroClient:
    def __init__(self):
        self.vid = cv2.VideoCapture()
        self.vid_lock = threading.Lock()

        def update():
            while True:
                time.sleep(0.001)
                if self.vid.isOpened():
                    self.vid_lock.acquire()
                    self.vid.grab()
                    self.vid_lock.release()

        self.vid_thread = threading.Thread(daemon=True, target=update)
        self.vid_thread.start()

    def set_focus(self, focus: int):
        requests.get(f'{PIZERO_HOST}/focus.html/{focus}')

    def set_exposure(self, exposure: int):
        requests.get(f'{PIZERO_HOST}/exposure.html/{exposure}')

    def get_orientation(self) -> [float, float, float, float]:
        return requests.get(f'{PIZERO_HOST}/imu.html').text.strip().split(',')

    def get_img(self) -> cv2.Mat:
        if not self.vid.isOpened():
            self.vid.open(f'{PIZERO_HOST}/stream.mjpg')
            self.vid.set(cv2.CAP_PROP_BUFFERSIZE, 1)
            time.sleep(1)

        self.vid_lock.acquire()
        frame = self.vid.retrieve()[1]
        self.vid_lock.release()
        return frame


    def download_all_images(self):
        raise NotImplemented

    def delete_all_images(self):
        raise NotImplemented