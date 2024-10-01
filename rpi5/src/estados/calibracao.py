import time
import cv2
import numpy

from ..pi_zero_client import PiZeroClient

#O frame do cv2 é do tipo numpy.ndarray, por isso não é necessário converter

def calculate_laplacian_variance(frame: numpy.ndarray)  -> float:
    return numpy.std(cv2.Laplacian(frame, cv2.CV_64F)) ** 2

def calculate_laplacian_mean(frame: numpy.ndarray) -> float:
    kernel = numpy.array([-1, 2, -1])
    laplacianX = numpy.abs(cv2.filter2D(frame, -1, kernel))
    laplacianY = numpy.abs(cv2.filter2D(frame, -1, kernel.T))
    return numpy.mean(laplacianX + laplacianY)

def calculate_teng_score(frame: numpy.ndarray) -> float:
    gaussianX = cv2.Sobel(frame, cv2.CV_64F, 1, 0)
    gaussianY = cv2.Sobel(frame, cv2.CV_64F, 1, 0)
    return numpy.mean(gaussianX * gaussianX +
                      gaussianY * gaussianY)

def calculate_max_laplacian(frame: numpy.ndarray) -> float:
    return numpy.max(cv2.convertScaleAbs(cv2.Laplacian(frame, 3)))

class EstadoCalibracao:
    def __init__(self, ihm, client: PiZeroClient, calibration_start:int = 0, calibration_end:int = 15, calibration_step:int = 1):
        #Nota, a PyCamera aceita valores floats como foco, porém é necessário reformular o código do servidor para aceitar esses valores.
        self.ihm = ihm
        self.client = client

        self.ihm.estado = 'Calibrando...'
        self.ihm.update_display()

        self.best_focus_value = None
        self.best_score = -float('inf')

        self.actual_focus = calibration_start
        self.calibration_step = calibration_step
        self.calibration_end = calibration_end

        try:
            self.client.set_focus(self.actual_focus)
        except:
           self.ihm.send_event(('Erro', 'SET FOCUS ERR'))

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
            self.ihm.send_event('fim_calibracao')
