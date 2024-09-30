import time
import cv2
import numpy
from src.localPiZeroClient import LocalPiZeroClient

def calculate_teng_score(frame: numpy.ndarray) -> float:
    gaussianX = cv2.Sobel(frame, cv2.CV_64F, 1, 0)
    gaussianY = cv2.Sobel(frame, cv2.CV_64F, 1, 0)
    return numpy.mean(gaussianX * gaussianX +
                      gaussianY * gaussianY)

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
        time.sleep(0.5)
