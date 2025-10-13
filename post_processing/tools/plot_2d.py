# plot_2d.py
import numpy as np
import matplotlib.pyplot as plt


def rotation_matrix_2d(theta):
    c = np.cos(theta)
    s = np.sin(theta)
    return np.array([[c, -s], [s, c]])


reference = np.load(
    "/home/fernando/Documents/encoder/ensaios/2025.09.26 ensaios para artigos/trajectory.npz"
)["arr_0"]


def plot2DFromData(list_displacements, px_p_mm):
    plt.ion()

    # Converter para coordenadas acumuladas (trajetória)

    phase = np.arctan2(list_displacements[:, 1], list_displacements[:, 0])
    # t = -np.median(phase[200:480])
    t = 1.5849477084158021

    correction_mat = rotation_matrix_2d(t)
    list_displacements = (correction_mat @ list_displacements.T).T

    absolute_displacements = np.linalg.norm(list_displacements, axis=1)
    phase = np.arctan2(list_displacements[:, 1], list_displacements[:, 0])
    trajectory_px = np.cumsum(list_displacements, axis=0)

    # Converter de pixels para milímetros
    trajectory_mm = trajectory_px / px_p_mm

    # Plotar o gráfico 2D
    fig = plt.figure()
    axis0 = plt.subplot2grid((2, 3), (0, 0), 2, 2)
    axis1 = plt.subplot2grid((2, 3), (0, 2), 1, 1)
    axis2 = plt.subplot2grid((2, 3), (1, 2), 1, 1)

    axis0.plot(trajectory_mm[:, 0], trajectory_mm[:, 1], label="Trajetória")
    axis0.set_xlabel("Deslocamento X (mm)")
    axis0.set_ylabel("Deslocamento Y (mm)")
    axis0.set_title("Trajetória 2D (em mm)")
    axis0.grid(True)
    axis0.legend()
    axis0.axis("equal")

    x, y = trajectory_mm[-1, 0], trajectory_mm[-1, 1]
    label_text = f"({x:.2f}, {y:.2f})"
    axis0.plot(x, y, "o", markersize=8, color="red")  # 'o' creates a circle marker
    axis0.text(
        x, y + 0.05, label_text, ha="center", va="bottom", fontsize=10, color="blue"
    )

    ref = -(reference[:, 1:] - np.array([389.6, 141.6]))
    axis0.plot(ref[:, 0], ref[:, 1], label="Referência", color="hotpink")

    axis1.set_title("Deslocamentos absolutos (px)")
    axis1.plot(absolute_displacements)

    axis2.set_title("Fase dos deslocamentos (rad)")
    axis2.plot(phase)

    fig.show()

    plt.ioff()
