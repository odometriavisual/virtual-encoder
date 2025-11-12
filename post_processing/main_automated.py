from ensaio import Ensaio
from visual_odometer import VisualOdometer

import matplotlib.pyplot as plt
import numpy as np

reference = -(np.load("trajectory.npz")["arr_0"][:, 1:] - np.array([300., 100.]))
root = "/home/fernando/Documents/encoder/ensaios/2025.10.13 Calibracao de distancia v3/"
ensaios = [
    # Calibração Clássica
    (root + "49_20251013T172832 MOV_TRIANGULO_20MM", 20, 22.67),
    (root + "49_20251013T173237 MOV_TRIANGULO_25MM", 25, 22.67),
    (root + "49_20251013T173541 MOV_TRIANGULO_30MM", 30, 22.67),
    # Calibração por centroides
    (root + "49_20251013T172832 MOV_TRIANGULO_20MM", 20, 26.712),
    (root + "49_20251013T173237 MOV_TRIANGULO_25MM", 25, 23.821),
    (root + "49_20251013T173541 MOV_TRIANGULO_30MM", 30, 20.874),
]


def find_vertices(trajectory):
    v0 = trajectory[0]
    v1 = trajectory[(trajectory[:, 0] + trajectory[:, 1]).argmax()]
    v2 = trajectory[(trajectory[:, 0] - trajectory[:, 1]).argmax()]
    v3 = trajectory[-1]
    return np.array([v0, v1, v2, v3])


def rotation_matrix_2d(theta):
    c = np.cos(theta)
    s = np.sin(theta)
    return np.array([[c, -s], [s, c]])


def plot_displacements(name, trajectory, absolute_displacements, phase, verts, reference):
    # Plotar o gráfico 2D
    plt.figure(name)
    axis0 = plt.subplot2grid((2, 3), (0, 0), 2, 2)
    axis1 = plt.subplot2grid((2, 3), (0, 2), 1, 1)
    axis2 = plt.subplot2grid((2, 3), (1, 2), 1, 1)

    axis0.plot(trajectory[:, 0], trajectory[:, 1], label="Trajetória")
    axis0.set_xlabel("Deslocamento X (mm)")
    axis0.set_ylabel("Deslocamento Y (mm)")
    axis0.set_title("Trajetória 2D (em mm)")
    axis0.grid(True)
    axis0.legend()
    axis0.axis("equal")

    x, y = trajectory[-1, 0], trajectory[-1, 1]
    label_text = f"({x:.2f}, {y:.2f})"
    axis0.plot(x, y, "o", markersize=8, color="red")  # 'o' creates a circle marker
    axis0.text(
        x, y + 0.05, label_text, ha="center", va="bottom", fontsize=10, color="blue"
    )

    axis0.plot(reference[:, 0], reference[:, 1], label="Referência", color="hotpink")

    axis0.plot(verts[:, 0], verts[:, 1], "x", markersize=10, color="red", linestyle="")

    axis1.set_title("Deslocamentos absolutos (px)")
    axis1.plot(absolute_displacements)

    axis2.set_title("Fase dos deslocamentos (rad)")
    axis2.plot(phase)



for name, cam_dist, px_p_mm in ensaios:
    ensaio = Ensaio(name)
    name = name.split(' ')[-1]

    if True or not ensaio.has_displacements():
        odometer = VisualOdometer((240, 320), frequency_window_params={"factor": 1.0}, async_mode=True)
        displacements, quaternions, timestamps = [], [], []

        imgs = ensaio.get_all_imgs()

        for i, (timestamp, img) in enumerate(imgs):
            odometer.feed_image(img)

            dx, dy = odometer.get_displacement()
            displacements.append([dx, dy])
            quaternions.append([1, 0, 0, 0])
            timestamps.append(timestamp)
            print(f"{name}: {i}/{ensaio.get_img_count()}")

        displacements = np.array(displacements)
        quaternions = np.array(quaternions)
        timestamps = np.array(timestamps)

        # Salvar dados
        ensaio.set_displacements(
            displacements=displacements, quaternions=quaternions, timestamps=timestamps
        )

    displacements = ensaio.get_displacements()["displacements"] / px_p_mm

    phase = np.arctan2(displacements[:, 1], displacements[:, 0])
    t = 1.5849477084158021
    correction_mat = rotation_matrix_2d(t)
    displacements = (correction_mat @ displacements.T).T

    absolute_displacements = np.linalg.norm(displacements, axis=1)
    phase = np.arctan2(displacements[:, 1], displacements[:, 0])
    trajectory = np.cumsum(displacements, axis=0)

    verts = find_vertices(trajectory)
    ref_verts = find_vertices(reference)

    cateto_x = np.linalg.norm(verts[1] - verts[0])
    ref_x = np.linalg.norm(ref_verts[1] - ref_verts[0])

    cateto_y = np.linalg.norm(verts[2] - verts[1])
    ref_y = np.linalg.norm(ref_verts[2] - ref_verts[1])

    hipotenusa = np.linalg.norm(verts[3] - verts[2])
    ref_hipotenusa = np.linalg.norm(ref_verts[3] - ref_verts[2])

    print(f"({cam_dist = }, {px_p_mm = }):".replace(".", ","))
    print(f"    {cateto_x = }, {ref_x = }".replace(".", ","))
    print(f"    {cateto_y = }, {ref_y = }".replace(".", ","))
    print(f"    {hipotenusa = }, {ref_hipotenusa = }".replace(".", ","))

    plot_displacements(f"{name}, px/mm = {px_p_mm}", trajectory, absolute_displacements, phase, verts, reference)

    
plt.show()
