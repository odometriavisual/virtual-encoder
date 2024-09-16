from __future__ import annotations

from score_calculator import calculate_teng_score
import preprocessing.grayscale
import preprocessing.window
import preprocessing.fft

import visual_odometer
import time
import cv2

from pi_zero_client import PiZeroClient, ImageStream

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
    def __init__(self, stream: ImageStream):
        print('Ativado!')
        self.stream = stream
        self.frame_num = -10

        self.img_old = None
        self.img = None
        self.M = None
        self.N = None

    def run(self):
        frame = self.stream.get_img()

        self.img = preprocessing.grayscale.cv2_to_nparray_grayscale(frame)
        self.img = preprocessing.window.apply_border_windowing_on_image(self.img)
        self.img = preprocessing.fft.image_preprocessing(self.img)

        self.M, self.N = self.img.shape

        if self.frame_num > 0:
            deltax, deltay = visual_odometer.svd_method(self.img, self.img_old, self.M, self.N)
            print(f"Frame:  {self.frame_num:>3.2f}, delta:[{deltax:>5.2f},{deltay:>5.2f}]")

        self.frame_num += 1
        self.img_old = self.img
        return None

class ModoCalibracao:

    def __init__(self, stream: ImageStream, client: PiZeroClient, calibration_start:int = 0, calibration_end:int = 15, calibration_step:int = 1):
        #Nota, a PyCamera aceita valores floats como foco, porém é necessário reformular o código do servidor para aceitar esses valores.

        self.client = client
        self.stream = stream

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

            frame = self.stream.get_img()

            score = calculate_teng_score(frame)

            if score > self.best_score:
                self.best_focus_value = self.actual_focus
                self.best_score = score
            print(self.actual_focus, score)

        else:
            self.client.set_focus(self.best_focus_value)
            return ModoHabilitado()

        return None