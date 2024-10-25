import time
import cv2
import numpy
from src.localPiZeroClient import LocalPiZeroClient
import json
import os

def calculate_teng_score(frame: numpy.ndarray) -> float:
    gaussianX = cv2.Sobel(frame, cv2.CV_64F, 1, 0)
    gaussianY = cv2.Sobel(frame, cv2.CV_64F, 1, 0)
    return numpy.mean(gaussianX * gaussianX +
                      gaussianY * gaussianY)

def save_calibration_data(client: LocalPiZeroClient):
    filename = 'home/pi/calibration_data.txt'
    with open(filename, "w") as f:
        # Salva os dados de calibração como um JSON no arquivo
        json.dump({
            "timestamp": time.time_ns(),
            "exposure": client.exposure,
            "focus": client.focus
        }, f)

def load_or_recalibrate(client: LocalPiZeroClient, recalibration_interval=3600):
    filename = 'calibration_data.txt'
    if os.path.exists(filename):
        # Carrega os dados do arquivo
        with open(filename, "r") as f:
            data = json.load(f)

        last_calibration_time = data.get("timestamp", 0)
        current_time = time.time_ns()

        if (current_time - last_calibration_time) < recalibration_interval * 1e9:
            #Não precisa ser feita a calibração
            print("load_or_recalibrate() -> Calibração não necessária carregando dados da última calibração")
            client.set_exposure(data["exposure"])
            client.set_focus(data["focus"])
        else:
            #Precisa ser feita a calibração
            print("load_or_recalibrate() -> Calibração ncessária iniciando processo de calibração")
            startLocalCalibration(LocalPiZeroClient)
    else:
        #Precisa ser feita a calibração
        print("load_or_recalibrate() -> Calibração ncessária iniciando processo de calibração")
        startLocalCalibration(LocalPiZeroClient)

def startLocalCalibration(client: LocalPiZeroClient,calibration_start:int = 0, calibration_end:int = 15, calibration_step:int = 1):
    best_focus_value = None
    best_score = -float('inf')
    actual_focus = calibration_start

    client.set_focus(actual_focus)
    time.sleep(1)

    while actual_focus < calibration_end:
        actual_focus += calibration_step
        client.set_focus(actual_focus)
        time.sleep(0.3)

        frame = client.get_img()
        score = calculate_teng_score(frame)

        if score > best_score:
            best_focus_value = actual_focus
            best_score = score
        print(actual_focus, score)

    else:
        client.set_focus(best_focus_value)
        save_calibration_data(client)
        time.sleep(0.5)
