import matplotlib
import matplotlib.pyplot as plt
import numpy as np
from numpy.linalg import pinv
import cv2 as cv
import time
from random import randint

matplotlib.use('qtagg')

# Radial Basis Function U:
def U(r):
    if r <= 0.:
        return 0
    else:
        return r**2 * np.log(r)

def dist(pt0, pt1):
    return np.sqrt((pt0[0] - pt1[0])**2 + (pt0[1] - pt1[1])**2)

def distortion_exp(x_true, y_true):
    center_x = 0.
    center_y = 0.
    angles = np.arctan2((y_true - center_y), (x_true - center_x))
    radii = np.sqrt((y_true - center_y) ** 2 + (x_true - center_x) ** 2)
    radii_distort = (radii / radii.max()) ** 1.7 * radii.max()
    x_distort = center_x + radii_distort * np.cos(angles)
    y_distort = center_y + radii_distort * np.sin(angles)
    return x_distort, y_distort

def distortion_center(x_true, y_true):
    c = np.array((320//2, 240//2))
    x_distort = np.zeros_like(x_true)
    y_distort = np.zeros_like(y_true)

    for i in range(len(x_true)):
        x_distort[i] = x_true[i] - np.square(0.03 * (x_true[i] - c[0])) * np.sign(x_true[i]-c[0])
        y_distort[i] = y_true[i] - np.square(0.03 * (y_true[i] - c[1])) * np.sign(y_true[i]-c[1])

    return x_distort, y_distort

def distortion_random(x_true, y_true):
    x_distort = np.zeros_like(x_true)
    y_distort = np.zeros_like(y_true)

    for i in range(len(x_true)):
        x_distort[i] = x_true[i] + randint(-30, 30)
        y_distort[i] = y_true[i] + randint(-30, 30)

    return x_distort, y_distort

if __name__ == '__main__':
    # img = cv.imread('/home/fernando/Downloads/ensaios_encoder/calib_ar_xadrez/1745960645637934760.jpg')
    # img = cv.imread('/home/fernando/Downloads/ensaios_encoder/calib_ar_xadrez/1745960642343975825.jpg')
    img, patternSize = cv.imread('/home/fernando/Documents/camera calibration/19_20250507T162316 circles/1746645809886753153.jpg'), (7, 5)

    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    ret, centers = cv.findCirclesGrid(gray, patternSize)

    x_measured, y_measured = np.array(centers[:,0,0]), np.array(centers[:,0,1])

    origin = (x_measured[4], y_measured[3])
    dx = centers[3 * patternSize[0] + 4 + 1][0][0] - centers[3 * patternSize[0] + 4][0][0]
    dy = centers[(3 + 1) * patternSize[0] + 4][0][1] - centers[3 * patternSize[0] + 4][0][1]

    print(f'{dx=}, {dy=}')

    h, w = img.shape[:2]
    x_expected = [ ]
    y_expected = [ ]

    for i in range(patternSize[1]):
        for j in range(patternSize[0]):
            x_expected.append(w/2 + (j+1 - 4) * dx)
            y_expected.append(h/2 + (i+1 - 3) * dy)

    N = len(x_expected)
    D = 2 # number of spatial dimensions

    K = np.zeros((len(x_expected), len(x_expected)), dtype=float)
    for i in range(len(x_expected)):
      for j in range(len(x_expected)):
        pt0 = (x_expected[i], y_expected[i])
        pt1 = (x_expected[j], y_expected[j])
        K[i, j] = U(dist(pt0, pt1))

    P = np.zeros((len(x_expected), D + 1))
    for i in range(len(x_expected)):
      P[i, 0] = 1
      P[i, 1] = x_expected[i]
      P[i, 2] = y_expected[i]

    L = np.zeros((N + D + 1, N + D + 1))
    L[:N, :N] = K
    L[:N, N:] = P
    L[N:, :N] = P.transpose()

    vo = np.zeros((N + D + 1, 1), dtype=float)
    for i in range(N):
      vo[i] = x_measured[i]

    L_inv = pinv(L.transpose() @ L) @ L.transpose()
    wa_x = L_inv @ vo

    def f_x(x, y):
      result = wa_x[N] + wa_x[N + 1] * x + wa_x[N + 2] * y
      for i in range(N):
        result += wa_x[i] * U(dist((x_expected[i], y_expected[i]), (x, y)))
      return result

    f_x_synth = np.zeros((N, 1))
    for i in range(N):
      f_x_synth[i] = f_x(x_expected[i], y_expected[i])

    vo_y = np.zeros((N + D + 1, 1), dtype=float)
    for i in range(N):
      vo_y[i] = y_measured[i]

    wa_y = L_inv @ vo_y

    def f_y(x, y):
      result = wa_y[N] + wa_y[N + 1] * x + wa_y[N + 2] * y
      for i in range(N):
        result += wa_y[i] * U(dist((x_expected[i], y_expected[i]), (x, y)))
      return result

    f_y_synth = np.zeros((N, 1))
    for i in range(N):
      f_y_synth[i] = f_y(x_expected[i], y_expected[i])

    x_TPS = np.zeros((N, 1))
    y_TPS = np.zeros((N, 1))
    for i in range(N):
      x_TPS[i] = f_x(x_expected[i], y_expected[i])
      y_TPS[i] = f_y(x_expected[i], y_expected[i])

    map_x = np.zeros(img.shape[0:2], dtype=np.float32)
    map_y = np.zeros(img.shape[0:2], dtype=np.float32)

    def sample_transformation(row, col):
        return f_x(col, row)[0], f_y(col, row)[0]

    print('sampling transformation...')
    t0 = time.time()
    for row in range(map_x.shape[0]):
        for col in range(map_x.shape[1]):
            map_x[row, col], map_y[row, col] = sample_transformation(row, col)
    print(f'ellapsed time: {time.time() - t0}s')

    print('remapping...')
    t0 = time.time()
    img_out = cv.remap(img, map_x, map_y, cv.INTER_LINEAR)
    print(f'ellapsed time: {time.time() - t0}s')

    plt.subplot(1, 2, 1)
    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    plt.imshow(img)

    plt.subplot(1, 2, 2)
    gray = cv.cvtColor(img_out, cv.COLOR_BGR2GRAY)
    plt.imshow(img_out)

    plt.show()