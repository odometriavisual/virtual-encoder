import cv2
import numpy

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
