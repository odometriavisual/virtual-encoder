import matplotlib.pyplot as plt
import numpy as np
from numpy.linalg import pinv
import cv2 as cv
import time
from random import randint

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
    x_true, y_true = np.meshgrid(np.linspace(0, 320, 5), np.linspace(0, 240, 5))
    dim = x_true.shape # Save this to reshape the residual later
    x_true = x_true.ravel()
    y_true = y_true.ravel()

    x_distort, y_distort = distortion_random(x_true, y_true)

    N = len(x_true)
    D = 2 # number of spatial dimensions

    K = np.zeros((len(x_true), len(x_true)), dtype=float)
    for i in range(len(x_true)):
      for j in range(len(x_true)):
        pt0 = (x_true[i], y_true[i])
        pt1 = (x_true[j], y_true[j])
        K[i, j] = U(dist(pt0, pt1))

    P = np.zeros((len(x_true), D + 1))
    for i in range(len(x_true)):
      P[i, 0] = 1
      P[i, 1] = x_true[i]
      P[i, 2] = y_true[i]

    L = np.zeros((N + D + 1, N + D + 1))
    L[:N, :N] = K
    L[:N, N:] = P
    L[N:, :N] = P.transpose()

    vo = np.zeros((N + D + 1, 1), dtype=float)
    for i in range(N):
      vo[i] = x_distort[i]

    L_inv = pinv(L.transpose() @ L) @ L.transpose()
    wa_x = L_inv @ vo

    def f_x(x, y):
      result = wa_x[N] + wa_x[N + 1] * x + wa_x[N + 2] * y
      for i in range(N):
        result += wa_x[i] * U(dist((x_true[i], y_true[i]), (x, y)))
      return result

    f_x_synth = np.zeros((N, 1))
    for i in range(N):
      f_x_synth[i] = f_x(x_true[i], y_true[i])

    vo_y = np.zeros((N + D + 1, 1), dtype=float)
    for i in range(N):
      vo_y[i] = y_distort[i]

    wa_y = L_inv @ vo_y

    def f_y(x, y):
      result = wa_y[N] + wa_y[N + 1] * x + wa_y[N + 2] * y
      for i in range(N):
        result += wa_y[i] * U(dist((x_true[i], y_true[i]), (x, y)))
      return result

    f_y_synth = np.zeros((N, 1))
    for i in range(N):
      f_y_synth[i] = f_y(x_true[i], y_true[i])

    x_TPS = np.zeros((N, 1))
    y_TPS = np.zeros((N, 1))
    for i in range(N):
      x_TPS[i] = f_x(x_true[i], y_true[i])
      y_TPS[i] = f_y(x_true[i], y_true[i])

    plt.figure(figsize=(8, 5))

    plt.subplot(1, 2, 1)
    plt.scatter(x_true, y_true, marker='o', color='C0')
    plt.scatter(x_distort, y_distort, marker='x', color='red')
    ax = plt.gca()
    ax.set_aspect('equal')
    plt.title('Original distortion')
    axis = plt.axis()
    plt.grid()

    plt.subplot(1, 2, 2)
    plt.scatter(x_true, y_true, marker='o', color='C0')
    plt.scatter(x_TPS, y_TPS, marker='x', color='red')
    ax = plt.gca()
    ax.set_aspect('equal')
    plt.title('TPS-modelled distortion (only training set)')
    plt.axis(axis)
    plt.grid()

    plt.show()

    img = cv.imread('/home/fernando/Documents/opencv/samples/data/min_left01.jpg')

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
    plt.imshow(img)
    plt.subplot(1, 2, 2)
    plt.imshow(img_out)
    plt.show()

