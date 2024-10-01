import time
import cv2
import numpy as np
from src.localPiZeroClient import LocalPiZeroClient

def calculate_teng_score(frame: np.ndarray) -> float:
    gaussianX = cv2.Sobel(frame, cv2.CV_64F, 1, 0)
    gaussianY = cv2.Sobel(frame, cv2.CV_64F, 1, 0)
    return np.mean(gaussianX * gaussianX + gaussianY * gaussianY)

def startLocalCalibration(client: LocalPiZeroClient, initial_focus: float, h: float = 1.0, max_iterations: int = 50, tolerance: float = 0.01):
    actual_focus = initial_focus
    client.set_focus(actual_focus)
    time.sleep(0.5)

    current_score = calculate_teng_score(client.get_img())

    for iteration in range(max_iterations):
        # Calculate score for focus + h
        client.set_focus(actual_focus + h)
        time.sleep(0.5)
        score_plus_h = calculate_teng_score(client.get_img())

        # Calculate score for focus - h
        client.set_focus(actual_focus - h)
        time.sleep(0.5)
        score_minus_h = calculate_teng_score(client.get_img())

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

        print(f"Iteration {iteration}: Focus = {actual_focus:.2f}, Score = {new_score:.2f}, Derivative = {derivative:.2f}, h = {h:.2f}")

        # Check for convergence
        if abs(new_score - current_score) < tolerance:
            print("Converged!")
            break

        # Ajuste dinâmico de h
        if abs(new_score - current_score) < tolerance * 10:  # Quando a mudança na pontuação é pequena
            h = max(h * 0.5, 0.01)  # Reduz pela metade, mas garante que h não fique menor que 0.01
        else:
            h = min(h * 1.1, 5.0)  # Aumenta h até um máximo razoável

        current_score = new_score  # Atualiza a pontuação atual

    return actual_focus
