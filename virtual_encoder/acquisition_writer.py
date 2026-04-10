import time
import threading
from datetime import datetime
from pathlib import Path

from .ensaio import EnsaioWriter


class AcquisitionWriter:
    def __init__(self, save_directory, gs):
        self.ENSAIOS_DIR = save_directory
        self.gs = gs

        self.__recording = False
        self.__acquisition = None

        self.__write_buffer_i = 0
        self.__pending_imgs = [[], []]
        self.__pending_orientations = [[], []]

        self.__threads = []

        dir = Path(self.ENSAIOS_DIR)
        if not dir.is_dir():
            dir.mkdir()

    def __reader_imgs_thread(self):
        while self.__recording:
            img = self.gs.camera.get_img()
            ts = time.time_ns()
            self.__pending_imgs[self.__write_buffer_i].append((img, ts))

    def __reader_orientations_thread(self):
        while self.__recording:
            imu_data = self.gs.imu.get_orientation()
            ts = time.time_ns()
            self.__pending_orientations[self.__write_buffer_i].append([ts, *imu_data])

    def __writer_thread(self):
        while self.__recording:
            time.sleep(0.5)
            read_buffer_i = self.__write_buffer_i
            self.__write_buffer_i = 1 - read_buffer_i

            for img, ts in self.__pending_imgs[read_buffer_i]:
                self.__acquisition.add_img(img, ts)
            self.__pending_imgs[read_buffer_i] = []

            for orientation in self.__pending_orientations[read_buffer_i]:
                self.__acquisition.add_imu_data(orientation)
            self.__pending_orientations[read_buffer_i] = []

        for imgs in self.__pending_imgs:
            for img, ts in imgs:
                self.__acquisition.add_img(img, ts)

        for orientations in self.__pending_orientations:
            for imu_data in orientations:
                self.__acquisition.add_imu_data(orientation)

    def start_acquisition(self, timestamp_ns, reason, pulses_period_ns):
        ensaio_date = datetime.fromtimestamp(timestamp_ns // 1_000_000_000).strftime(
            "%Y%m%dT%H%M%S"
        )
        self.__acquisition = EnsaioWriter(
            f"{ensaio_date} {reason}" if len(reason) > 0 else f"{ensaio_date}",
            first_pulse_timestamp=timestamp_ns,
            exposure=self.gs.camera.get_exposure(),
            pulses_period=pulses_period_ns,
            dir=self.ENSAIOS_DIR,
        )
        self.__recording = True
        self.__pending_imgs = [[], []]
        self.__pending_orientations = [[], []]

        self.__threads = [
            threading.Thread(target=self.__reader_imgs_thread, daemon=True),
            threading.Thread(target=self.__reader_orientations_thread, daemon=True),
            threading.Thread(target=self.__writer_thread, daemon=True),
        ]
        for t in self.__threads:
            t.start()

        self.gs.add_message(f"Gravando aquisição: {self.__acquisition.get_name()}")

    def stop_acquisition(self):
        self.__recording = False
        for t in self.__threads:
            t.join()

        self.__acquisition.close()
        self.gs.add_message(
            f'Aquisição completa: <a href="/ensaios/{self.__acquisition.get_name()}.zip">{self.__acquisition.get_name()}</a>'
        )
        self.__acquisition = None
        self.__threads = []
        self.__acquistion_name = ""
