import time
import cv2
import numpy as np
from src.localPiZeroClient import LocalPiZeroClient


def calculate_teng_score(frame: np.ndarray) -> float:
    gaussianX = cv2.Sobel(frame, cv2.CV_64F, 1, 0)
    gaussianY = cv2.Sobel(frame, cv2.CV_64F, 0, 1)  # Corrigido para Y
    return np.mean(gaussianX * gaussianX + gaussianY * gaussianY)


def startLocalCalibration(client: LocalPiZeroClient, initial_focus: float, max_iterations: int = 20,
                          tolerance: float = 1):
    actual_focus = initial_focus
    client.set_focus(actual_focus)
    time.sleep(0.5)
    h = 1
    prev_score = calculate_teng_score(client.get_img())

    for iteration in range(max_iterations):
        # Capture the frame and calculate the current score
        frame = client.get_img()
        current_score = calculate_teng_score(frame)

        # Calculate score for focus + h
        client.set_focus(actual_focus + h)
        time.sleep(0.5)
        frame_plus_h = client.get_img()
        score_plus_h = calculate_teng_score(frame_plus_h)

        # Calculate score for focus - h
        client.set_focus(actual_focus - h)
        time.sleep(0.5)
        frame_minus_h = client.get_img()
        score_minus_h = calculate_teng_score(frame_minus_h)

        # Calculate the derivative approximation
        derivative = (score_plus_h - score_minus_h) / (2 * h)

        # Update the focus based on the derivative
        if derivative > 0:
            actual_focus += h  # Aumenta o foco
        else:
            actual_focus -= h  # Diminui o foco

        # Apply a limit to ensure we don't go beyond the calibration range
        actual_focus = np.clip(actual_focus, 0, 15)  # Ajuste conforme necessário

        # Set the focus to the new value and check the new score
        client.set_focus(actual_focus)
        time.sleep(0.5)
        new_score = calculate_teng_score(client.get_img())

        print(
            f"Iteration {iteration}: Focus = {actual_focus:.2f}, Score = {new_score:.2f}, Derivative = {derivative:.2f}")

        # Ajuste h com base na mudança na pontuação
        if abs(new_score - current_score) < tolerance:
            h *= 0.5  # Diminui o passo se a melhoria é pequena
        else:
            h = min(h * 1.1, 1)  # Aumenta o passo se a melhoria é significativa, mas limita a 1

        # Check for convergence
        if abs(new_score - prev_score) < tolerance:
            print("Converged!")
            break

        prev_score = new_score  # Atualiza o score anterior

    return actual_focus
