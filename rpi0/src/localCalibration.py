import time
import cv2
import numpy
from .localPiZeroClient import LocalPiZeroClient
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
    actual_focus = calibration_start
    actual_exposure = exposure_start

    focus_sum = 0
    num_exposures = (exposure_end - exposure_start) / calibration_step
    while actual_exposure <= exposure_end:
        # Resets the best values:
        best_focus_value = best_score = 0

        # Sets the exposure:
        client.set_exposure(actual_exposure)
        actual_exposure += exposure_step

        while actual_focus <= calibration_end:
            # Sets the focus:
            client.set_focus(actual_focus)
            actual_focus += calibration_step

            # Takes a frame:
            time.sleep(0.3)  # Wait so changes take effect
            frame = client.get_img()

            # Compute how good is the focus:
            score = calculate_teng_score(frame)

            if score > best_score:
                best_focus_value = actual_focus
                best_score = score
            print(actual_focus, score)
        time.sleep(1)
        focus_sum += best_focus_value
    else:
        focus_mean = focus_sum / num_exposures

        # Set the focus for the mean of best values, and reset the exposure:
        client.set_focus(focus_mean)
        client.reset_exposure()
        save_calibration_data(client)
        time.sleep(0.5)
