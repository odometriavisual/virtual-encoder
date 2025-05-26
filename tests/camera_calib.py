import matplotlib
import matplotlib.pyplot as plt
import numpy as np
from numpy.linalg import pinv
import cv2 as cv
import time
from math import ceil
from tqdm.contrib.itertools import product as tqdm_product

matplotlib.use('qtagg')

def U(r):
    """
    Radial Basis Function U
    """
    if r <= 0.:
        return 0
    else:
        return np.power(r, 2) * np.log(r)

def U_np(r):
    r[r <= 0.] = 0.0000000000001
    ret = r ** 2 * np.log(r)
    return ret

def dist(pt0, pt1):
    pt0 = np.array(pt0)
    pt1 = np.array(pt1)
    return np.linalg.norm(pt1 - pt0)

def create_tps(x_expected, y_expected, x_measured, y_measured):
    """
    Creates fx and fy that models distortion
    """
    N = len(x_expected)
    D = 2 # number of spatial dimensions

    K = np.zeros((len(x_expected), len(x_expected)), dtype=np.float32)
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
    L_inv = pinv(L.transpose() @ L) @ L.transpose()

    vo_x = np.zeros((N + D + 1, 1), dtype=np.float32)
    for i in range(N):
        vo_x[i] = x_measured[i]
    wa_x = L_inv @ vo_x

    vo_y = np.zeros((N + D + 1, 1), dtype=np.float32)
    for i in range(N):
        vo_y[i] = y_measured[i]
    wa_y = L_inv @ vo_y

    def f(x, y):
        result_x = wa_x[N] + wa_x[N + 1] * x + wa_x[N + 2] * y
        result_y = wa_y[N] + wa_y[N + 1] * x + wa_y[N + 2] * y

        points = np.array([p for p in zip(x_expected, y_expected)])
        d = np.reshape(np.linalg.norm(points - np.array([x, y]), axis=1), (-1, 1))
        i = np.arange(N)
        result_x += np.sum(wa_x[i] * U_np(d))
        result_y += np.sum(wa_y[i] * U_np(d))

        return result_x[0], result_y[0]

    return f

def create_remap(img_shape, sample_transformation):
    """
    Creates map for opencv's remap function sampling values from sample_transformation
    """
    n_rows, n_cols = img_shape[:2]
    map_x = np.zeros([n_rows, n_cols], dtype=np.float32)
    map_y = np.zeros([n_rows, n_cols], dtype=np.float32)

    for y, x in tqdm_product(range(n_rows), range(n_cols), desc='Creating TPS map'):
        # A ordem dos indices aqui é ao contrario mesmo
        #   1o indice é linha (y) e segundo a coluna (x)
        map_x[y, x], map_y[y, x] = sample_transformation(x, y)

    return map_x, map_y

def save_map(map_x, map_y, file='distortion_calibration_map.npz'):
    np.savez(file, map_x=map_x, map_y=map_y, allow_pickle=True)

def load_map(file='distortion_calibration_map.npz'):
    data = np.load(file, allow_pickle=True)
    return data['map_x'], data['map_y']

if __name__ == '__main__':
    # img, patternSize = cv.imread('/home/fernando/Documents/encoder/tests camera calibration/19_20250507T162316 circles/1746645809886753153.jpg'), (7, 5)
    img, patternSize = cv.imread('/home/fernando/Documents/encoder/tests camera calibration/lab agua nova camera/a.jpg'), (13, 11)

    # Intended distance between circles in px
    dx_intended, dy_intended = 20, 20

    # True: create a new calibration map, False: Load last map
    create_map = False

    # Show detected circles before map creation
    debug_circles = True

    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    ret, centers = cv.findCirclesGrid(gray, patternSize)

    x_measured, y_measured = np.array(centers[:,0,0]), np.array(centers[:,0,1])

    cx = ceil(patternSize[0]/2)
    cy = ceil(patternSize[1]/2)
    print(f'{cx=} {cy=}')
    origin = (x_measured[cx], y_measured[cy])
    dx = centers[cy * patternSize[0] + cx + 1][0][0] - centers[cy * patternSize[0] + cx][0][0]
    dy = centers[(cy + 1) * patternSize[0] + cx][0][1] - centers[cy * patternSize[0] + cx][0][1]

    print(f'measured: {dx=}, {dy=}')
    print(f'intended: {dx_intended=}, {dy_intended=}')
    dx, dy = dx_intended, dy_intended

    h, w = img.shape[:2]
    x_expected = np.array([w/2 + (j+1 - cx) * dx for i in range(patternSize[1]) for j in range(patternSize[0])])
    y_expected = np.array([h/2 + (i+1 - cy) * dy for i in range(patternSize[1]) for j in range(patternSize[0])])

    if debug_circles:
        img1 = img.copy()
        img2 = img.copy()
        centers2 = np.array([[[x, y]] for x, y in zip(x_expected, y_expected)], dtype=np.float32)

        cv.drawChessboardCorners(img1, patternSize, centers, ret)
        cv.drawChessboardCorners(img2, patternSize, centers2, ret)

        plt.subplot(1, 2, 1)
        plt.title('Circles found')
        plt.imshow(img1)

        plt.subplot(1, 2, 2)
        plt.title('Expected circles after calibration')
        plt.imshow(img2)
        plt.show()

    if create_map:
        t0 = time.time()
        sample_tps = create_tps(x_expected, y_expected, x_measured, y_measured)
        map_x, map_y = create_remap(img.shape, sample_tps)
        save_map(map_x, map_y)
        print(f'Map creation time: {time.time() - t0:.2f}s')

    t0 = time.time()
    map_x, map_y = load_map()
    img_out = cv.remap(img, map_x, map_y, cv.INTER_LINEAR)
    print(f'Remap time: {(time.time() - t0)*1000:.2f}ms')

    plt.figure()
    plt.title('Original image')
    plt.imshow(img)

    plt.figure()
    plt.title('Calibrated image')
    plt.imshow(img_out)

    plt.show()
