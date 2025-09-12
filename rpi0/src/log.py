from os import makedirs, listdir
from datetime import datetime
from os.path import isdir, getsize
from cv2 import imwrite

import threading
import csv
import time
import shutil
import os
import zipfile
import queue


class Logger:
    def __init__(self):
        with open("/home/pi/boot-count.txt") as file:
            self.boot_num = file.read().strip()

        with open("/home/pi/px_p_mm.txt") as file:
            self.px_p_mm = file.read().strip()

        time_now = time.time_ns()
        datenow = datetime.fromtimestamp(time_now // 1_000_000_000).strftime(
            "%Y%m%dT%H%M%S"
        )
        self.root_dir = "/home/pi/picam_imgs"
        self.ensaio_number = f"{self.boot_num}_{datenow}"
        self.save_dir = f"{self.root_dir}/{self.ensaio_number}"
        self.imu_file = None
        self.ensaio_reason = "timeout"

        self.client = None
        self.orientations_queue = queue.Queue()

        self.enable_save_period = 15 * 1_000_000_000
        self.enable_save = False

    def _poll_rpi5_status(self):
        time.sleep(10)
        while True:
            time.sleep(0.1)
            time_now = time.time_ns()
            if (
                not self.enable_save
                and time_now > self.client.last_status_time + self.enable_save_period
            ):
                self.start_acquisition(time_now, "timeout")

    def _save_imgs(self):
        while True:
            self.client.frame_available.wait()
            self.client.frame_available.clear()
            frame = self.client.get_img()

            if self.enable_save:
                filename = f"{self.save_dir}/{time.time_ns()}.jpg"
                imwrite(filename, frame)

    def _save_orientations(self):
        while True:
            measure = self.orientations_queue.get(True)

            if self.enable_save:
                if measure[0] > 0:
                    writer = csv.writer(self.imu_file)
                    writer.writerow(list(measure))

    def _save_calibration_data(self, timestamp_ns, pulses_period_ns):
        path = f"{self.save_dir}/calibration_data.csv"
        with open(path, mode="w", newline="") as file:
            writer = csv.writer(file)
            writer.writerow(
                ["first_pulse_timestamp", "exposure", "px_p_mm", "pulses_period_ns"]
            )
            writer.writerow(
                [timestamp_ns, self.client.exposure, self.px_p_mm, pulses_period_ns]
            )

    def start_acquisition(self, timestamp_ns, reason, pulses_period_ns):
        datenow = datetime.fromtimestamp(timestamp_ns // 1_000_000_000).strftime(
            "%Y%m%dT%H%M%S"
        )

        self.ensaio_number = f"{self.boot_num}_{datenow}"
        self.ensaio_reason = reason

        if reason is None or len(reason) == 0:
            ensaio_name = f"{self.ensaio_number}"
        else:
            ensaio_name = f"{self.ensaio_number} {reason}"

        self.save_dir = f"{self.root_dir}/{ensaio_name}"
        if not isdir(self.save_dir):
            makedirs(self.save_dir)

            imu_path = f"{self.save_dir}/imu.csv"
            with open(imu_path, mode="w", newline="") as file:
                writer = csv.writer(file)
                writer.writerow(
                    [
                        "timestamp",
                        "qw",
                        "qx",
                        "qy",
                        "qz",
                        "acc_x",
                        "acc_y",
                        "acc_z",
                    ]
                )
            self.imu_file = open(imu_path, mode="a", newline="")

            self._save_calibration_data(timestamp_ns, pulses_period_ns)

        self.client.send_debug_message(f"Aquisição iniciada: {ensaio_name}")
        self.enable_save = True

    def stop_acquisition(self):
        self.enable_save = False
        i = self.save_dir.rindex("/")
        _root_dir, base_dir = self.save_dir[:i], self.save_dir[i + 1 :]

        self.imu_file.close()
        self.imu_file = None

        self.client.send_debug_message(
            f"Gravando aquisição: {base_dir}.zip, aguarde..."
        )

        self.archive_ensaio(base_dir)
        shutil.rmtree(self.save_dir)

        self.client.send_debug_message(
            f'Aquisição gravada: <a href="/ensaio0/{base_dir}.zip">{base_dir}.zip [{self.sizeof_fmt(getsize(self.save_dir + ".zip"))}]</a>'
        )

        self.fix_unzipped_dirs()

    def fix_unzipped_dirs(self):
        unzipped_dirs = [
            dir for dir in listdir(self.root_dir) if dir.find(".zip") == -1
        ]
        for base_dir in unzipped_dirs:
            self.archive_ensaio(base_dir)
            shutil.rmtree(f"{self.root_dir}/{base_dir}")
            self.client.send_debug_message(
                f'Aquisição gravada: <a href="/ensaio0/{base_dir}.zip">{base_dir}.zip [{self.sizeof_fmt(getsize(self.save_dir + ".zip"))}]</a>'
            )

    def archive_ensaio(self, base_dir):
        ensaio_dir = os.path.join(self.root_dir, base_dir)
        zip_path = ensaio_dir + ".zip"

        with zipfile.ZipFile(
            zip_path, mode="w", compression=zipfile.ZIP_STORED
        ) as zip_file:
            for root, dirs, files in os.walk(ensaio_dir):
                for file in files:
                    zip_file.write(
                        os.path.join(root, file),
                        os.path.relpath(
                            os.path.join(root, file), os.path.join(ensaio_dir, "..")
                        ),
                    )

    def sizeof_fmt(self, num, suffix="B"):
        for unit in ("", "Ki", "Mi", "Gi", "Ti", "Pi", "Ei", "Zi"):
            if abs(num) < 1024.0:
                return f"{num:3.1f}{unit}{suffix}"
            num /= 1024.0
        return f"{num:.1f}Yi{suffix}"

    def start(self):
        self.fix_unzipped_dirs()

        threading.Thread(target=self._poll_rpi5_status, daemon=True).start()
        threading.Thread(target=self._save_imgs, daemon=True).start()
        threading.Thread(target=self._save_orientations, daemon=True).start()
