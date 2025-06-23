import os
import glob
import numpy as np
import cv2
from tkinter import Tk, filedialog

def adjust_brightness_adaptively(img, target_brightness=130):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    mean_brightness = np.mean(gray)
    if abs(mean_brightness - target_brightness) < 10:
        return img
    gamma = target_brightness / mean_brightness
    gamma = np.clip(gamma, 0.7, 1.5)
    img_float = img.astype(np.float32) / 255.0
    img_gamma = np.power(img_float, 1.0 / gamma)
    img_corrected = np.clip(img_gamma * 255, 0, 255).astype(np.uint8)
    return img_corrected

def draw_moving_grid_with_4_colors(img, current_pos, center, scale_factor=1.0, spacing=50, highlight_square_origin=None):
    h, w = img.shape[:2]
    grid_layer = np.zeros_like(img, dtype=np.uint8)

    min_world_x = current_pos[0] - w // 2 / scale_factor
    max_world_x = current_pos[0] + w // 2 / scale_factor
    min_world_y = current_pos[1] - h // 2 / scale_factor
    max_world_y = current_pos[1] + h // 2 / scale_factor

    vertical_colors = [(0, 255, 0), (255, 255, 0), (0, 200, 255), (255, 100, 180)]
    horizontal_colors = [(255, 0, 0), (0, 255, 255), (255, 150, 50), (200, 100, 255)]

    gx = int(np.floor(min_world_x / spacing)) * spacing
    while gx <= max_world_x:
        dx = (gx - current_pos[0]) * scale_factor
        img_x = int(center[0] - dx)
        if 0 <= img_x < w:
            color = vertical_colors[(gx // spacing) % 4]
            cv2.line(grid_layer, (img_x, 0), (img_x, h), color, 1)
        gx += spacing

    gy = int(np.floor(min_world_y / spacing)) * spacing
    while gy <= max_world_y:
        dy = (gy - current_pos[1]) * scale_factor
        img_y = int(center[1] - dy)
        if 0 <= img_y < h:
            color = horizontal_colors[(gy // spacing) % 4]
            cv2.line(grid_layer, (0, img_y), (w, img_y), color, 1)
        gy += spacing

    if highlight_square_origin is not None:
        dx = (highlight_square_origin[0] - current_pos[0]) * scale_factor
        dy = (highlight_square_origin[1] - current_pos[1]) * scale_factor

        x = int(center[0] - dx)
        y = int(center[1] - dy)
        size = int(spacing * scale_factor)

        top_left = (x - size // 2, y - size // 2)
        bottom_right = (x + size // 2, y + size // 2)
        cv2.rectangle(grid_layer, top_left, bottom_right, (0, 0, 255), 2)

    alpha = 0.35
    return cv2.addWeighted(grid_layer, alpha, img, 1 - alpha, 0)

def create_trajectory_overlay_centered(img, trajectory_points, current_idx, scale_factor=1.0, spacing=50, highlight_square_origin=None):
    img_with_overlay = img.copy()
    h, w = img.shape[:2]
    center = (w // 2, h // 2)

    current_pos = trajectory_points[current_idx]

    img_with_overlay = draw_moving_grid_with_4_colors(
        img_with_overlay,
        current_pos,
        center,
        scale_factor=scale_factor,
        spacing=spacing,
        highlight_square_origin=highlight_square_origin,
    )

    points_to_draw = []
    for i in range(0, current_idx + 1):
        point = trajectory_points[i]
        rel_x = int(center[0] - (point[0] - current_pos[0]) * scale_factor)
        rel_y = int(center[1] - (point[1] - current_pos[1]) * scale_factor)
        points_to_draw.append((rel_x, rel_y))

    for i in range(1, len(points_to_draw)):
        x1, y1 = points_to_draw[i - 1]
        x2, y2 = points_to_draw[i]
        color_ratio = i / max(len(points_to_draw) - 1, 1)
        color = (int(255 * (1 - color_ratio)), int(255 * color_ratio), 100)
        cv2.line(img_with_overlay, (x1, y1), (x2, y2), color, thickness=2)

    cv2.circle(img_with_overlay, center, 6, (0, 0, 255), -1)
    cv2.circle(img_with_overlay, center, 8, (255, 255, 255), 1)

    return img_with_overlay

def create_side_by_side_video():
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
    trajectory = np.cumsum(displacements, axis=0)

    image_files = sorted(glob.glob(os.path.join(image_folder, "*.jpg")))
    num_frames = min(len(image_files), len(trajectory))
    trajectory = trajectory[:num_frames]
    image_files = image_files[:num_frames]

    first_img = cv2.imread(image_files[0])
    height, width = first_img.shape[:2]
    spacing = 100
    patch_size = spacing

    current_square_origin = np.copy(trajectory[0])

    out = cv2.VideoWriter(
        os.path.join(image_folder, "comparacao_lado_a_lado2.mp4"),
        cv2.VideoWriter_fourcc(*"mp4v"),
        60,
        (width * 2, height)
    )

    for i in range(num_frames):
        img = cv2.imread(image_files[i])
        if img is None:
            continue

        img = adjust_brightness_adaptively(img)
        current_pos = trajectory[i]

        img_main = create_trajectory_overlay_centered(
            img, trajectory, i, scale_factor=1.0, spacing=spacing, highlight_square_origin=current_square_origin
        )

        dx_world = current_square_origin[0] - current_pos[0]
        dy_world = current_square_origin[1] - current_pos[1]
        cx = width // 2 - int(dx_world)
        cy = height // 2 - int(dy_world)

        def square_in_image(xc, yc, patch_sz, img_w, img_h):
            return (xc - patch_sz // 2 >= 0 and
                    xc + patch_sz // 2 <= img_w and
                    yc - patch_sz // 2 >= 0 and
                    yc + patch_sz // 2 <= img_h)

        if not square_in_image(cx, cy, patch_size, width, height):
            if i > 0:
                delta = trajectory[i] - trajectory[i - 1]
            else:
                delta = np.array([0.0, 0.0])

            delta = delta / (np.linalg.norm(delta) + 1e-6)
            offset_x = (width // 2 - patch_size // 2) * delta[0]
            offset_y = (height // 2 - patch_size // 2) * delta[1]
            current_square_origin = current_pos + np.array([offset_x, offset_y])

            dx_world = current_square_origin[0] - current_pos[0]
            dy_world = current_square_origin[1] - current_pos[1]
            cx = width // 2 - int(dx_world)
            cy = height // 2 - int(dy_world)

        x1 = cx - patch_size // 2
        x2 = cx + patch_size // 2
        y1 = cy - patch_size // 2
        y2 = cy + patch_size // 2
        patch = img[y1:y2, x1:x2]

        patch_frame = np.zeros_like(img)
        if patch.shape[0] == patch_size and patch.shape[1] == patch_size:
            y_off = height // 2 - patch_size // 2
            x_off = width // 2 - patch_size // 2
            patch_frame[y_off:y_off+patch_size, x_off:x_off+patch_size] = patch

        combined = np.zeros((height, width * 2, 3), dtype=np.uint8)
        combined[:, :width] = img_main
        combined[:, width:] = patch_frame

        out.write(combined)
        print(f"Frame {i+1}/{num_frames} processado...")

    out.release()
    print(f"Vídeo lado a lado salvo em: {os.path.join(image_folder, 'comparacao_lado_a_lado2.mp4')}")

if __name__ == "__main__":
    create_side_by_side_video()
