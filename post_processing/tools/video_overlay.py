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
        img_with_overlay, current_pos, center,
        scale_factor=scale_factor, spacing=spacing,
        highlight_square_origin=highlight_square_origin
    )

    for i in range(1, current_idx + 1):
        pt1 = trajectory_points[i - 1]
        pt2 = trajectory_points[i]
        rel_x1 = int(center[0] - (pt1[0] - current_pos[0]) * scale_factor)
        rel_y1 = int(center[1] - (pt1[1] - current_pos[1]) * scale_factor)
        rel_x2 = int(center[0] - (pt2[0] - current_pos[0]) * scale_factor)
        rel_y2 = int(center[1] - (pt2[1] - current_pos[1]) * scale_factor)
        cv2.line(img_with_overlay, (rel_x1, rel_y1), (rel_x2, rel_y2), (255, 100, 100), 2)

    cv2.circle(img_with_overlay, center, 6, (0, 0, 255), -1)
    return img_with_overlay

def square_in_image(xc, yc, patch_sz, img_w, img_h):
    return (xc - patch_sz // 2 >= 0 and xc + patch_sz // 2 <= img_w and
            yc - patch_sz // 2 >= 0 and yc + patch_sz // 2 <= img_h)

def create_side_by_side_video():
    Tk().withdraw()
    folder = filedialog.askdirectory(title="Selecione a pasta")
    if not folder:
        return

    data = np.load(os.path.join(folder, "displacements_data.npz"))
    displacements = data["displacements"]
    trajectory = np.cumsum(displacements, axis=0)

    imgs = sorted(glob.glob(os.path.join(folder, "*.jpg")))
    imgs = imgs[:len(trajectory)]

    first_img = cv2.imread(imgs[0])
    height, width = first_img.shape[:2]
    spacing = 100
    patch_size = spacing
    out = cv2.VideoWriter(os.path.join(folder, "output_patch_follow.mp4"), cv2.VideoWriter_fourcc(*"mp4v"), 30, (2 * width, height))

    current_square_origin = np.floor(trajectory[0] / spacing) * spacing

    for i in range(len(imgs)):
        img = cv2.imread(imgs[i])
        img = adjust_brightness_adaptively(img)
        pos = trajectory[i]

        dx = current_square_origin[0] - pos[0]
        dy = current_square_origin[1] - pos[1]
        cx = width // 2 - int(dx)
        cy = height // 2 - int(dy)

        if not square_in_image(cx, cy, patch_size, width, height):
            if i > 0:
                move_vec = trajectory[i] - trajectory[i - 1]
            else:
                move_vec = np.array([1.0, 0.0])

            norm = np.linalg.norm(move_vec)
            move_dir = move_vec / norm if norm != 0 else np.array([1.0, 0.0])

            edge_offset = width // 2 - patch_size // 2 - 2
            x_off = int(np.clip(move_dir[0], -1, 1) * edge_offset)
            y_off = int(np.clip(move_dir[1], -1, 1) * edge_offset)

            new_cx = width // 2 + x_off
            new_cy = height // 2 + y_off
            new_origin_x = pos[0] + (width // 2 - new_cx)
            new_origin_y = pos[1] + (height // 2 - new_cy)
            current_square_origin = np.array([new_origin_x, new_origin_y])
            cx = new_cx
            cy = new_cy

        x1 = cx - patch_size // 2
        x2 = cx + patch_size // 2
        y1 = cy - patch_size // 2
        y2 = cy + patch_size // 2
        patch = img[y1:y2, x1:x2] if square_in_image(cx, cy, patch_size, width, height) else np.zeros((patch_size, patch_size, 3), dtype=np.uint8)

        patch_frame = np.zeros_like(img)
        x_off = width // 2 - patch_size // 2
        y_off = height // 2 - patch_size // 2
        patch_frame[y_off:y_off+patch_size, x_off:x_off+patch_size] = patch

        img_main = create_trajectory_overlay_centered(img, trajectory, i, spacing=spacing, highlight_square_origin=current_square_origin)

        combined = np.zeros((height, 2 * width, 3), dtype=np.uint8)
        combined[:, :width] = img_main
        combined[:, width:] = patch_frame

        out.write(combined)
        print(f"Frame {i+1}/{len(imgs)} processado...")

    out.release()
    print("Vídeo salvo!")

if __name__ == "__main__":
    create_side_by_side_video()