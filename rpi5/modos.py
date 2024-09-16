from visual_odometer import VisualOdometer
from score_calculator import calculate_teng_score
import preprocessing.grayscale

import time

from pi_zero_client import PiZeroClient

class ModoDisparo:
    def __init__(self, encoder):
        self.encoder = encoder
        self.last_run_time =  time.monotonic()

    def run(self):
        current_time = time.monotonic()
        if (current_time - self.last_run_time) >= 1:
            self.encoder.send_pulses(count=1)
            self.last_run_time = current_time

        time.sleep(0.001)
        return None

class ModoHabilitado:
    def __init__(self):
        print('Habilitado!')

    def run(self):
        time.sleep(1)
        return None


class ModoAtivado:
    def __init__(self, client: PiZeroClient, odometer: VisualOdometer):
        print('Ativado!')
        self.client = client
        self.odometer = odometer

        img = preprocessing.grayscale.cv2_to_nparray_grayscale(self.client.get_img())
        self.odometer.feed_image(img)

    def run(self):
        frame = self.client.get_img()

        img = preprocessing.grayscale.cv2_to_nparray_grayscale(frame)
        self.odometer.feed_image(img)
        deltax, deltay = self.odometer.estimate_last_displacement()

        print(f"Frame:  delta:[{deltax:>5.2f},{deltay:>5.2f}]")
        return None

class ModoCalibracao:
    def __init__(self, client: PiZeroClient, calibration_start:int = 0, calibration_end:int = 15, calibration_step:int = 1):
        #Nota, a PyCamera aceita valores floats como foco, porém é necessário reformular o código do servidor para aceitar esses valores.

        self.client = client

        self.best_focus_value = None
        self.best_score = -float('inf')

        self.actual_focus = calibration_start
        self.calibration_step = calibration_step
        self.calibration_end = calibration_end

        self.client.set_focus(self.actual_focus)

    def run(self):
        if self.actual_focus < self.calibration_end:

            self.actual_focus += self.calibration_step
            self.client.set_focus(self.actual_focus)
            time.sleep(0.3)

            frame = self.client.get_img()

            score = calculate_teng_score(frame)

            if score > self.best_score:
                self.best_focus_value = self.actual_focus
                self.best_score = score
            print(self.actual_focus, score)

        else:
            self.client.set_focus(self.best_focus_value)
            return ModoHabilitado()

        return None