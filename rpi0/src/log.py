from os import makedirs
from datetime import datetime
from os.path import isfile, isdir
from cv2 import imwrite

import threading, csv, time

class Logger:
    def __init__(self, client):
        with open('/home/pi/boot-count.txt') as file:
            self.boot_num = file.read().strip()

        time_now = time.time_ns()
        date = datetime.fromtimestamp(time_now // 1_000_000_000).strftime('%Y%m%d_%H%M%S')
        self.save_dir = f'/home/pi/picam_imgs/{self.boot_num}_{date}'
        self.client = client

        self.enable_save_period = 15 * 1_000_000_000
        self.enable_save = False

    def _poll_rpi5_status(self):
        time.sleep(10)
        while True:
            time.sleep(0.1)

            time_now = time.time_ns()
            if time_now > self.client.last_status_time + self.enable_save_period or self.client.rpi5status == 'Disparo':
                if not self.enable_save:
                    datenow = datetime.fromtimestamp(time_now // 1000000000).isoformat() .strftime('%Y%m%dT%H%M%S')
                    self.save_dir = f'/home/pi/picam_imgs/{self.boot_num}_{datenow}'
                    if not isdir(self.save_dir):
                        makedirs(self.save_dir)

                    self.enable_save = True
            elif self.enable_save:
                self.enable_save = False

    def _save_imgs(self):
        while True:
            self.client.frame_available.wait()
            self.client.frame_available.clear()
            frame = self.client.get_img()

            if self.enable_save:
                filename = f'{self.save_dir}/{time.time_ns()}.jpg'
                imwrite(filename, frame)

    def _save_orientations(self):
        while True:
            time.sleep(0.1)

            if self.enable_save:
                path = f'{self.save_dir}/imu.csv'
                if not isfile(path):
                    with open(path, mode='w', newline='') as file:
                        writer = csv.writer(file)
                        writer.writerow(["timestamp", "boot_time", "qx", "qy", "qz", "qw"])

                measure = self.client.get_orientation()
                if measure[0] > 0:
                    with open(path, mode='a', newline='') as file:
                        writer = csv.writer(file)
                        writer.writerow(list(measure))

    def start(self):
        threading.Thread(target=self._poll_rpi5_status, daemon=True).start()
        threading.Thread(target=self._save_imgs, daemon=True).start()
        threading.Thread(target=self._save_orientations, daemon=True).start()

