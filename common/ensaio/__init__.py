from pathlib import Path
from zipfile import ZipFile
import csv
import io

import numpy as np
import cv2
from numpy.typing import NDArray


class Ensaio:
    def __init__(
        self,
        name: str,
        *,
        first_pulse_timestamp: int = 0,
        exposure: int = 0,
        px_p_mm: float = 0,
        pulses_period: int = 0,
    ):
        """
        Invariant: after __init__ finishes Ensaio is open in append mode
                   you should not assume that the invariant is mantained during method calls
        thread unsafe
        """
        self.__name = name
        self.__zip_path = Path(self.__name + ".zip")

        if not self.__zip_path.exists():
            with ZipFile(self.__zip_path, "w") as zip:
                zip.mkdir("data")

                with io.TextIOWrapper(
                    zip.open("data/calibration_data.csv", mode="w"), newline=""
                ) as file:
                    writer = csv.writer(file)
                    writer.writerow(
                        [
                            "first_pulse_timestamp",
                            "exposure",
                            "px_p_mm",
                            "pulses_period_ns",
                        ]
                    )
                    writer.writerow(
                        [
                            first_pulse_timestamp,
                            exposure,
                            px_p_mm,
                            pulses_period,
                        ]
                    )

                with io.TextIOWrapper(
                    zip.open("data/imu.csv", mode="w"), newline=""
                ) as file:
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
                    writer.writerow(
                        [
                            0,
                            1, 0, 0, 0,
                            0, 0, 0,
                        ]
                    )

        with ZipFile(self.__zip_path, "r") as zip:
            calibration_filename = [
                filename
                for filename in zip.namelist()
                if "calibration_data" in filename
            ][0]

            with io.TextIOWrapper(
                zip.open(calibration_filename, "r"), encoding="UTF-8"
            ) as file:
                reader = csv.DictReader(file)
                data = next(reader)

                self.__first_pulse_timestamp = int(data["first_pulse_timestamp"])
                self.__exposure = int(data["exposure"])
                self.__px_p_mm = float(data["px_p_mm"])
                self.__pulses_period = int(data["pulses_period_ns"])

                
            imu_filename = [
                filename
                for filename in zip.namelist()
                if "imu" in filename
            ][0]

            with io.TextIOWrapper(
                zip.open(imu_filename, "r"), encoding="UTF-8"
            ) as file:
                reader = csv.DictReader(file)

                self.__imu_data = []
                for row in reader:
                    self.__imu_data.append({
                        'timestamp': int(row['timestamp']),
                        'qx': float(row['qx']) if row['qx'] else 0.0,
                        'qy': float(row['qy']) if row['qy'] else 0.0,
                        'qz': float(row['qz']) if row['qz'] else 0.0,
                        'qw': float(row['qw']) if row['qw'] else 0.0,
                    })

            self.__imgs = sorted(
                [filename for filename in zip.namelist() if ".jpg" in filename]
            )
            self.__img_count = len(self.__imgs)

        self.__zip = ZipFile(self.__zip_path, "a")
        
    def get_name(self) -> str:
        return self.__name

    def get_filename(self) -> str:
        return f"{self.__name}.zip"

    def get_first_pulse_timestamp(self) -> int:
        return self.__first_pulse_timestamp

    def get_pulses_period(self) -> int:
        return self.__exposure

    def get_exposure(self) -> int:
        return self.__pulses_period

    def get_px_p_mm(self) -> float:
        return self.__px_p_mm

    def get_img_count(self) -> int:
        return self.__img_count

    def get_imu_data(self) -> [dict]:
        return self.__imu_data

    def set_displacements(
        self, displacements: NDArray, quaternions: NDArray, timestamps: NDArray
    ) -> dict:
        with self.__zip.open("data/displacements_data.npz", "w") as displacements_file:
            np.savez(
                displacements_file,
                displacements=displacements,
                quaternions=quaternions,
                timestamps=timestamps,
            )

    def has_displacements(self) -> bool:
        self.__zip.close()
        
        with ZipFile(self.__zip_path, "r") as zip:
            return "data/displacements_data.npz" in zip.namelist()

        self.__zip = ZipFile(self.__zip_path, "a")

    def get_displacements(self) -> dict:
        self.__zip.close()

        with ZipFile(self.__zip_path, "r") as zip:
            with zip.open("data/displacements_data.npz", "r") as displacements_file:
                data = np.load(displacements_file, allow_pickle=True)

                return {
                    'displacements': data['displacements'],
                    'quaternions': data['quaternions'],
                    'timestamps': data['timestamps'],
                }

        self.__zip = ZipFile(self.__zip_path, "a")


    def add_img(self, img: NDArray, timestamp: int):
        _, buf =  cv2.imencode(".jpg", img)
        self.__zip.writestr(f"data/{timestamp}.jpg", buf)

        self.__img_count += 1

    def get_img(self, i: int) -> (int, NDArray):
        self.__zip.close()

        filename = self.__imgs[i]
        try:
            with ZipFile(self.__zip_path, "r") as zip:
                return (
                    int(Path(filename).stem),
                    cv2.imdecode(
                        np.frombuffer(zip.read(filename), dtype=np.uint8),
                        cv2.IMREAD_GRAYSCALE,
                    ),
                )
        except KeyboardInterrupt:
            pass
        finally:
            self.__zip = ZipFile(self.__zip_path, "a")

    def get_all_imgs(self) -> [(int, NDArray)]:
        self.__zip.close()

        imgs = []
        try:
            with ZipFile(self.__zip_path, "r") as zip:
                for filename in self.__imgs:
                    imgs.append((
                        int(Path(filename).stem),
                        cv2.imdecode(
                            np.frombuffer(zip.read(filename), dtype=np.uint8),
                            cv2.IMREAD_GRAYSCALE,
                        ),
                    ))
            return imgs
        except KeyboardInterrupt:
            return []
        finally:
            self.__zip = ZipFile(self.__zip_path, "a")
