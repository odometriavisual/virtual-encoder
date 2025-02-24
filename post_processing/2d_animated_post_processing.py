import glob
import os
import csv
import numpy as np
import matplotlib.pyplot as plt
import cv2
from datetime import datetime
from tkinter import Tk, filedialog
from tqdm import tqdm
from PIL import Image, ImageOps

from visual_odometer import VisualOdometer
from visual_odometer.preprocessing import image_preprocessing
from visual_odometer.displacement_estimators.svd import svd_method

CONFIG = {
    "Displacement Estimation": {
        "method": "svd",
        "params": {}
    },
    "Frequency Window": {
        "method": "Stone et al 2007",
        "params": {}
    },
    "Spatial Window": {
        "method": "blackman_harris",
        "params": {
            "a0": 0.358,
            "a1": 0.47,
            "a2": 0.135,
            "a3": 0.037,
        }
    },
    "Downsampling": {
        "method": "",
        "params": {
            "factor": 1,
        }
    },
}

skip_frames = True
skip_min_distance = 10

def load(filename):
    img_array_rgb = Image.open(filename)
    img_grayscale = ImageOps.grayscale(img_array_rgb)
    img_array = np.asarray(img_grayscale)
    return img_array

def preprocessing(img_array):
    return image_preprocessing(img_array, CONFIG)


def load_imu_data(imu_file):
    imu_data = []
    with open(imu_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            imu_data.append({
                'timestamp': int(row['timestamp']),
                'qx': float(row['qx']) if row['qx'] else 0.0,
                'qy': float(row['qy']) if row['qy'] else 0.0,
                'qz': float(row['qz']) if row['qz'] else 0.0,
                'qw': float(row['qw']) if row['qw'] else 0.0
            })
    return imu_data


def find_closest_imu_data(imu_data, img_timestamp):
    return min(imu_data, key=lambda x: abs(x['timestamp'] - img_timestamp))

def extract_timestamp(filename):
    return int(os.path.basename(filename).split('.')[0])



# Selecionar pasta de processamento
Tk().withdraw()
image_folder = filedialog.askdirectory(title="Selecione a pasta de imagens")
imu_file = os.path.join(image_folder, "imu.csv")

imu_data = load_imu_data(imu_file)
image_files = sorted(glob.glob(os.path.join(image_folder, '*.jpg')))
img_stream = [load(img_file) for img_file in tqdm(image_files, desc="Carregando imagens")]
img_preprocessed_list = [preprocessing(img_array) for img_array in tqdm(img_stream, desc="Pré-processando imagens")]
image_timestamps = [extract_timestamp(f) for f in image_files]

img_size = img_stream[0].shape
old_processed_img = img_preprocessed_list.pop(0)

positions2D = [(0, 0)]
current_position2D = np.array([0.0, 0.0])

# Configuração do vídeo
if skip_frames is True:
    video_filename = image_folder+"/trajetoria_threeshold.avi"
else:
    video_filename = image_folder+"/trajetoria.avi"

frame_size = (img_size[1], img_size[0])
fps = 60

print(fps)
video_writer = cv2.VideoWriter(video_filename, cv2.VideoWriter_fourcc(*'MJPG'), fps, frame_size, isColor=True)

fig, ax = plt.subplots(figsize=(img_size[1] / 100, img_size[0] / 100), frameon=False)
ax.set_position([0, 0, 1, 1])  # Remove espaços ao redor
ax.set_axis_off()  # Desativa os eixos

image_plot = ax.imshow(img_stream[0], cmap='gray')
trajectory_plot, = ax.plot([], [], 'r-', linewidth=2)
ax.set_title('Imagem Processada com Trajetória')
ax.axis('off')

# Configuração da grade (ajuste o espaçamento conforme necessário)
grid_spacing = 100  # Tamanho maior das linhas da grade
grid_size_factor = 20  # Fator para garantir que a grade seja bem maior que a área visível


def draw_grid(ax, center_position, spacing, size_factor, img_size):
    grid_lines_x = np.arange(center_position[0] - size_factor * img_size[1],
                             center_position[0] + size_factor * img_size[1], spacing)
    grid_lines_y = np.arange(center_position[1] - size_factor * img_size[0],
                             center_position[1] + size_factor * img_size[0], spacing)

    for gx in grid_lines_x:
        ax.plot([gx, gx], [grid_lines_y.min(), grid_lines_y.max()], 'k--', alpha=0.3, linewidth=1)
    for gy in grid_lines_y:
        ax.plot([grid_lines_x.min(), grid_lines_x.max()], [gy, gy], 'k--', alpha=0.3, linewidth=1)

# Inicializa a posição da grade
centered_position = np.array([img_size[1] // 2, img_size[0] // 2])
draw_grid(ax, centered_position, grid_spacing, grid_size_factor, img_size)

# Inicialização da plotagem de imagens e trajetória
image_plot = ax.imshow(img_stream[0], cmap='gray')
trajectory_plot, = ax.plot([], [], 'r-', linewidth=2)
ax.set_title('Imagem Processada com Trajetória')
ax.axis('off')

# Define a origem inicial da trajetória
origin_2D = np.array([img_size[1] // 2, img_size[0] // 2])  # Centro da imagem

for img_preprocessed, img_file, img_raw in tqdm(zip(img_preprocessed_list, image_files, img_stream[1:]),
                                                total=len(image_files) - 1, desc="Calculando deslocamento"):
    ax.clear()
    ax.set_axis_off()

    img_timestamp = int(os.path.basename(img_file).split('.')[0])
    dx, dy = svd_method(img_preprocessed, old_processed_img, img_size[0], img_size[1], phase_windowing="central")

    if skip_frames is True:
        displacement = np.array([dx, dy])
        if np.linalg.norm(displacement) > skip_min_distance:
            current_position2D += np.array([dx, dy])
            old_processed_img = img_preprocessed

    else:
        # Atualiza a posição relativa ao centro inicial
        current_position2D += np.array([dx, dy])
        old_processed_img = img_preprocessed

    positions2D.append(current_position2D.copy())  # Armazena corretamente a trajetória

    # Mantém a imagem fixa no fundo
    ax.imshow(img_raw, cmap='gray', extent=[0, img_size[1], img_size[0], 0], alpha=0.6)

    # Converte a posição para o sistema de coordenadas correto
    positions_array = np.array(positions2D) + origin_2D - current_position2D

    # Agora a grade se move com a trajetória
    draw_grid(ax, origin_2D - current_position2D, grid_spacing, grid_size_factor, img_size)

    # Trajetória centralizada no ponto inicial
    ax.plot(positions_array[:, 0], positions_array[:, 1], 'r-', linewidth=2)

    # Mantém a visualização fixa na imagem
    ax.set_xlim(0, img_size[1])
    ax.set_ylim(img_size[0], 0)

    fig.canvas.draw()

    # Captura e grava no vídeo
    frame = np.frombuffer(fig.canvas.tostring_argb(), dtype=np.uint8)
    frame = frame.reshape(fig.canvas.get_width_height()[::-1] + (4,))
    frame = frame[:, :, 1:4]
    frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
    frame = cv2.resize(frame, frame_size, interpolation=cv2.INTER_CUBIC)
    video_writer.write(frame)

# Finaliza a gravação do vídeo
video_writer.release()
plt.ioff()

positions2D = np.array(positions2D)
last_dx_dy = svd_method(img_preprocessed_list[0], img_preprocessed_list[-1], img_size[1], img_size[0])
error_discrepancy = np.linalg.norm(positions2D[0] - positions2D[-1])

if skip_frames is True:
    output_path_lf = os.path.join(image_folder, 'last_frame_SKP_T.png')
else:
    output_path_lf = os.path.join(image_folder, 'last_frame_SKP_F.png')

fig.savefig(output_path_lf)

plt.figure(figsize=(8, 6))
plt.plot(positions2D[:, 0], positions2D[:, 1], marker='o')
plt.axis('equal')
plt.title('Trajetória de Deslocamento 2D')
plt.xlabel('Deslocamento em X (px)')
plt.ylabel('Deslocamento em Y (px)')
plt.grid()

if skip_frames is True:
    output_path = os.path.join(image_folder, 'trajetoria_deslocamento_2D_SKP_T.png')
else:
    output_path = os.path.join(image_folder, 'trajetoria_deslocamento_2D_SKP_F.png')

plt.savefig(output_path)

erro_acumulado = positions2D[0] - positions2D[-1]
plt.text(0.05, 0.95,
         f"Último deslocamento: dx={last_dx_dy[0]:.2f}, dy={last_dx_dy[1]:.2f}\nErro acumulado: dx={erro_acumulado[0]:.2f}, dy={erro_acumulado[1]:.2f}",
         transform=plt.gca().transAxes, fontsize=12, verticalalignment='top', bbox=dict(facecolor='white', alpha=0.5))
#plt.show()
