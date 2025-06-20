import os
import glob
import numpy as np
import cv2
from tkinter import Tk, filedialog


def create_trajectory_overlay_centered(img, trajectory_points, current_idx, scale_factor=1.0):
    """
    Desenha a trajetória relativa ao ponto atual, fixando a câmera no centro da imagem.
    """

    img_with_overlay = img.copy()
    h, w = img.shape[:2]
    center = (w // 2, h // 2)

    # Posição acumulada atual (referência)
    current_pos = trajectory_points[current_idx]

    # Recalcular todas as posições em relação ao ponto atual
    points_to_draw = []
    for i in range(0, current_idx + 1):
        point = trajectory_points[i]
        rel_x = int(center[0] - (point[0] - current_pos[0]) * scale_factor)
        rel_y = int(center[1] - (point[1] - current_pos[1]) * scale_factor)
        points_to_draw.append((rel_x, rel_y))  # ⬅️ inclui todos, mesmo que fora da imagem

    # Agora conectamos os pontos como estão, respeitando continuidade
    for i in range(1, len(points_to_draw)):
        x1, y1 = points_to_draw[i - 1]
        x2, y2 = points_to_draw[i]
        color_ratio = i / max(len(points_to_draw) - 1, 1)
        color = (
            int(255 * (1 - color_ratio)),
            int(255 * color_ratio),
            100
        )
        cv2.line(img_with_overlay, (x1, y1), (x2, y2), color, thickness=2)

    # Ponto atual em vermelho
    cv2.circle(img_with_overlay, center, 6, (0, 0, 255), -1)
    cv2.circle(img_with_overlay, center, 8, (255, 255, 255), 1)

    return img_with_overlay


def create_video_with_trajectory_overlay():
    """
    Gera vídeo com sobreposição de trajetória centrada no frame atual.
    """
    Tk().withdraw()
    image_folder = filedialog.askdirectory(title="Selecione a pasta de imagens")
    if not image_folder:
        print("Nenhuma pasta selecionada.")
        return

    data_path = os.path.join(image_folder, "displacements_data.npz")
    if not os.path.exists(data_path):
        print("Arquivo de deslocamento não encontrado.")
        return

    data = np.load(data_path, allow_pickle=True)
    displacements = data["displacements"]

    image_files = sorted(glob.glob(os.path.join(image_folder, "*.jpg")))
    if len(image_files) == 0:
        print("Nenhuma imagem encontrada.")
        return

    num_frames = min(len(image_files), len(displacements))
    image_files = image_files[:num_frames]
    displacements = displacements[:num_frames]
    trajectory = np.cumsum(displacements, axis=0)

    first_img = cv2.imread(image_files[0])
    if first_img is None:
        print("Erro ao carregar a primeira imagem.")
        return

    height, width = first_img.shape[:2]
    output_path = os.path.join(image_folder, "trajetoria_overlay_centrada.mp4")
    out = cv2.VideoWriter(output_path, cv2.VideoWriter_fourcc(*"mp4v"), 5, (width, height))

    for i in range(num_frames):
        print(f"Frame {i + 1}/{num_frames}")
        img = cv2.imread(image_files[i])
        if img is None:
            print(f"Erro ao carregar {image_files[i]}")
            continue

        img_overlayed = create_trajectory_overlay_centered(img, trajectory, i, scale_factor=1.0)
        out.write(img_overlayed)

    out.release()
    print(f"Vídeo salvo em: {output_path}")


if __name__ == "__main__":
    create_video_with_trajectory_overlay()