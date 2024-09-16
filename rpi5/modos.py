import preprocessing.grayscale
import preprocessing.window
import preprocessing.fft

import visual_odometer
import time
import cv2

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

class ModoHabilitado:
    def __init__(self):
        print('Habilitado!')

    def run(self):
        time.sleep(1)


class ModoAtivado:
    def __init__(self, vid: cv2.VideoCapture):
        print('Ativado!')
        self.vid = vid
        self.frame_num = -10

        self.img_old = None
        self.img = None
        self.M = None
        self.N = None

    def run(self):
        ret, frame = self.vid.read()

        self.img = preprocessing.grayscale.cv2_to_nparray_grayscale(frame)
        self.img = preprocessing.window.apply_border_windowing_on_image(self.img)
        self.img = preprocessing.fft.image_preprocessing(self.img)

        self.M, self.N = self.img.shape

        if self.frame_num > 0:
            deltax, deltay = visual_odometer.svd_method(self.img, self.img_old, self.M, self.N)
            print(f"Frame:  {self.frame_num:>3.2f}, delta:[{deltax:>5.2f},{deltay:>5.2f}]")

        self.frame_num += 1
        self.img_old = self.img

