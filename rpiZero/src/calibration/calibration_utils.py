import numpy as np
import cv2

def calculate_distance(corner1, corner2):
    x1, y1 = corner1[0], corner1[1]
    x2, y2 = corner2[0], corner2[1]

    distance = np.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    return distance


def find_corners(img):
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    temp = cv2.GaussianBlur(img_gray, (0, 0), 105)
    img_gray = cv2.addWeighted(img_gray, 1.8, temp, -0.8, 0, img_gray)
    ret, corners = cv2.findChessboardCorners(img_gray, (6, 6),
                                             flags=cv2.CALIB_CB_ADAPTIVE_THRESH | cv2.CALIB_CB_NORMALIZE_IMAGE)
    return ret, corners


def find_mm_per_pixel_calibration(img):
    ret, corners = find_corners(img)
    if ret:
        # cv2.drawChessboardCorners(img, (6,6), corners, ret)
        pixel_distance_horizontal = calculate_distance(corners[0][0], corners[5][0])
        # pixel_distance_vertical = calculate_distance(corners[5][0], corners[35][0])

        chess_size = 50  # mm
        chess_squares = 7
        chess_internal_squares = 5

        per_square_size = chess_size / chess_squares  # mm
        detected_squares_total_size = chess_internal_squares * per_square_size  # mm

        mm_per_pixel_calibration = detected_squares_total_size / pixel_distance_horizontal

        return mm_per_pixel_calibration
    else:
        print("No chessboard detected")
        return None

