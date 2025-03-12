import time
import cv2
import numpy
from .local_pi_zero_client import LocalPiZeroClient
import json
import os


def calculate_teng_score(frame: numpy.ndarray) -> float:
    gaussianX = cv2.Sobel(frame, cv2.CV_64F, 1, 0)
    gaussianY = cv2.Sobel(frame, cv2.CV_64F, 1, 0)
    return numpy.mean(gaussianX * gaussianX +
                      gaussianY * gaussianY)


def save_calibration_data(client: LocalPiZeroClient):
    filename = '/home/pi/calibration_data.txt'
    with open(filename, "w") as f:
        # Salva os dados de calibração como um JSON no arquivo
        json.dump({
            "timestamp": time.time_ns(),
            "exposure": client.exposure,
            "focus": client.focus
        }, f)


def load_or_recalibrate(client: LocalPiZeroClient, recalibration_interval=3600):
    filename = '/home/pi/calibration_data.txt'
    if os.path.exists(filename):
        # Carrega os dados do arquivo
        with open(filename, "r") as f:
            data = json.load(f)

        last_calibration_time = data.get("timestamp", 0)
        current_time = time.time_ns()

        if (current_time - last_calibration_time) < recalibration_interval * 1e9:
            #Não precisa ser feita a calibração
            print("load_or_recalibrate() -> Calibração não necessária carregando dados da última calibração")
            client.set_exposure(data["exposure"] or 0)
            client.set_focus(data["focus"] or 0)
        else:
            #Precisa ser feita a calibração
            print("load_or_recalibrate() -> Calibração ncessária iniciando processo de calibração")
            startLocalCalibration(client)
    else:
        #Precisa ser feita a calibração
        print("load_or_recalibrate() -> Calibração ncessária iniciando processo de calibração")
        startLocalCalibration(client)


def startLocalCalibration(client: LocalPiZeroClient,
                          calibration_start: int = 0, calibration_end: int = 30, calibration_step: int = .5,
                          exposure_start: int = 50, exposure_end: int = 150, exposure_step: int = 25):
    client.set_focus(20)
    save_calibration_data(client)
