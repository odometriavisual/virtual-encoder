import threading
import time
import subprocess
from subprocess import SubprocessError

import cv2
import numpy as np
import requests
from requests.exceptions import RequestException

PIZERO_HOST = 'http://rpi0:7123'

class PiZeroClient:
    def __init__(self):
        self.streaming_enabled = True

        self.vid_lock = threading.Lock()
        self.vid = cv2.VideoCapture()

        self.frame_lock = threading.Lock()
        self.frame = cv2.Mat(np.array(0x000000AA, dtype=np.float32))

        def update():
            while True:
                time.sleep(0.001)

                with self.vid_lock:
                    if self.streaming_enabled:
                        if self.vid.isOpened():
                            ret, frame = self.vid.read()

                            if ret:
                                with self.frame_lock:
                                    self.frame = frame
                            else:
                                self.frame = cv2.Mat(np.array(0x000000AA, dtype=np.float32))
                                self.vid.release()
                                cv2.destroyAllWindows()

                        else:
                            self.vid.open(f'{PIZERO_HOST}/stream.mjpg')
                            self.vid.set(cv2.CAP_PROP_BUFFERSIZE, 1)
                            time.sleep(1)
                    else:
                        time.sleep(0.01)

        self.vid_thread = threading.Thread(daemon=True, target=update)
        self.vid_thread.start()

    def pizero_calibration(self):
        try:
            requests.get(f'{PIZERO_HOST}/run_autofocus', timeout=300.0)
            return True
        except RequestException:
            return False

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
        with self.vid_lock:
            if self.streaming_enabled and not self.vid.isOpened():
                self.vid.open(f'{PIZERO_HOST}/stream.mjpg')
                self.vid.set(cv2.CAP_PROP_BUFFERSIZE, 1)
                time.sleep(1)

        with self.frame_lock:
            frame = self.frame.copy()

        return frame

    def get_status(self, local_status):
        try:
            with open('/sys/class/thermal/thermal_zone0/temp', 'r') as file:
                temp = file.read()
                temp = int(temp) / 1000

            status = requests.get(f'{PIZERO_HOST}/status?rpi5status={local_status}', timeout=1.0).json()
            status['rpi5'] = { 'temp': temp, 'ip': None }
        except RequestException:
            status = {
                'rpi5': {'temp': temp, 'ip': None},
                'rpi0': False,
                'imu': False,
                'camera': False,
            }

        return status

    def get_file_count(self) -> int:
        try:
            file_count = requests.get(f'{PIZERO_HOST}/file_count', timeout=15.0).text.strip()
            return int(file_count)
        except (RequestException, ValueError):
            return 0

    def poweroff(self):
        try:
            requests.get(f'{PIZERO_HOST}/poweroff', timeout=1.0)
        except RequestException:
            return

        try:
            subprocess.run(['sudo', 'poweroff'])
        except SubprocessError:
            pass

    def reboot(self):
        try:
            requests.get(f'{PIZERO_HOST}/reboot', timeout=1.0)
        except RequestException:
            return

        try:
            subprocess.run(['sudo', 'reboot'])
        except SubprocessError:
            pass

    def disable_streaming(self):
        with self.vid_lock:
            self.streaming_enabled = False
            self.vid.release()
            cv2.destroyAllWindows()

        with self.frame_lock:
            self.frame = cv2.Mat(np.array(0x000000AA, dtype=np.float32))

    def enable_streaming(self):
        with self.vid_lock:
            self.streaming_enabled = True