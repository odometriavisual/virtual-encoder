from os import makedirs
from datetime import datetime
from os.path import isfile, isdir
from cv2 import imwrite

import threading, csv, time, shutil, queue

class Logger:
    def __init__(self):
        with open('/home/pi/boot-count.txt') as file:
            self.boot_num = file.read().strip()

        time_now = time.time_ns()
        datenow = datetime.fromtimestamp(time_now // 1_000_000_000).strftime('%Y%m%dT%H%M%S')
        self.root_dir = f'/home/pi/picam_imgs'
        self.ensaio_number = f'{self.boot_num}_{datenow}'
        self.save_dir = f'{self.root_dir}/{self.ensaio_number}'

        self.client = None
        self.orientations_queue = queue.Queue()

        self.enable_save_period = 15 * 1_000_000_000
        self.enable_save = False

    def _poll_rpi5_status(self):
        time.sleep(10)
        while True:
            time.sleep(0.1)
            time_now = time.time_ns()
            if time_now > self.client.last_status_time + self.enable_save_period:
                self.start_acquisition(time_now)

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
            measure = self.orientations_queue.get(True)

            if self.enable_save:
                path = f'{self.save_dir}/imu.csv'
                if not isfile(path):
                    with open(path, mode='w', newline='') as file:
                        writer = csv.writer(file)
                        writer.writerow(["timestamp", "qw", "qx", "qy", "qz"])

                if measure[0] > 0:
                    with open(path, mode='a', newline='') as file:
                        writer = csv.writer(file)
                        writer.writerow(list(measure))

    def _save_calibration_data(self):
        path = f'{self.save_dir}/calibration_data.csv'
        time_now = time.time_ns()
        with open(path, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(["timestamp", "exposure", "focus"])
            writer.writerow([time_now, self.client.exposure, self.client.focus])

    def start_acquisition(self, timestamp_ns):
        datenow = datetime.fromtimestamp(timestamp_ns // 1_000_000_000).strftime('%Y%m%dT%H%M%S')

        self.ensaio_number = f'{self.boot_num}_{datenow}'
        self.save_dir = f'{self.root_dir}/{self.ensaio_number}'

        if not isdir(self.save_dir):
            makedirs(self.save_dir)
            self._save_calibration_data()

        self.enable_save = True

    def stop_acquisition(self):
        self.enable_save = False
        shutil.make_archive(f'{self.root_dir}/{self.ensaio_number}', 'zip', self.root_dir, self.ensaio_number)
        shutil.rmtree(self.save_dir)

    def start(self):
        threading.Thread(target=self._poll_rpi5_status, daemon=True).start()
        threading.Thread(target=self._save_imgs, daemon=True).start()
        threading.Thread(target=self._save_orientations, daemon=True).start()

