from os import makedirs
from datetime import datetime
from os.path import isfile, isdir
from .modos.modo_odometro import ModoOdometro

import threading, csv, time

class Logger:
    def __init__(self, modo):
        with open('/home/pi/boot-count.txt') as file:
            self.boot_num = file.read().strip()

        time_now = time.time_ns()
        datenow = datetime.fromtimestamp(time_now // 1_000_000_000).strftime('%Y%m%dT%H%M%S')
        self.save_dir = f'/home/pi/picam_imgs/{self.boot_num}_{datenow}'
        self.modo = modo

        self.enable_save_period = 15 * 1_000_000_000
        self.enable_save = False

    def _poll_modo(self):
        time.sleep(10)
        while True:
            time.sleep(0.1)
            time_now = time.time_ns()
            if isinstance(self.modo, ModoOdometro):
                if not self.enable_save:
                    datenow = datetime.fromtimestamp(time_now // 1_000_000_000).strftime('%Y%m%dT%H%M%S')
                    self.save_dir = f'/home/pi/picam_imgs/{self.boot_num}_{datenow}'
                    if not isdir(self.save_dir):
                        makedirs(self.save_dir)
                        self._save_displacement()

                    self.enable_save = True
            elif self.enable_save:
                self.enable_save = False


    def _save_displacement(self):
        last_displacement_index = 0
        while True:
            time.sleep(0.1)
            if self.enable_save:
                path = f'{self.save_dir}/imu.csv'
                if not isfile(path):
                    with open(path, mode='w', newline='') as file:
                        writer = csv.writer(file)
                        writer.writerow(["timestamp", "x", "y"])

                current_displacement_index = self.modo.odometer.number_of_displacements
                if current_displacement_index != last_displacement_index and current_displacement_index != 0:
                    timenow = time.time_ns()
                    with open(path, mode='a', newline='') as file:
                        writer = csv.writer(file)
                        row = [timenow, self.modo.odometer[0], self.modo.odometer[1]]
                        writer.writerow(row)
                    last_displacement_index = current_displacement_index
                elif current_displacement_index == 0:
                    last_displacement_index = 0 # resets the index

    def start(self):
        threading.Thread(target=self._poll_modo, daemon=True).start()
        threading.Thread(target=self._save_displacement, daemon=True).start()

