import glob
import os
import csv
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
from tkinter import Tk, filedialog
from tqdm import tqdm

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

def load(filename):
    from PIL import Image, ImageOps
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

# Selecionar pasta de processamento
Tk().withdraw()
image_folder = filedialog.askdirectory(title="Selecione a pasta de imagens")
imu_file = os.path.join(image_folder, "imu.csv")

imu_data = load_imu_data(imu_file)
image_files = sorted(glob.glob(os.path.join(image_folder, '*.jpg')))
img_stream = [load(img_file) for img_file in tqdm(image_files, desc="Carregando imagens")]
img_preprocessed_list = [preprocessing(img_array) for img_array in tqdm(img_stream, desc="Pré-processando imagens")]

img_size = img_stream[0].shape
old_processed_img = img_preprocessed_list.pop(0)

positions2D = [(0, 0)]
current_position2D = np.array([0.0, 0.0])

for img_preprocessed, img_file in tqdm(zip(img_preprocessed_list, image_files), total=len(image_files)-1, desc="Calculando deslocamento"):
    img_timestamp = int(os.path.basename(img_file).split('.')[0])
    dx, dy = svd_method(img_preprocessed, old_processed_img, img_size[1], img_size[0])
    current_position2D += np.array([dx, dy])
    positions2D.append((current_position2D[0], current_position2D[1]))
    old_processed_img = img_preprocessed

positions2D = np.array(positions2D)

# Calcular last_dx_dy
last_dx_dy = svd_method(img_preprocessed_list[0], img_preprocessed_list[-1], img_size[1], img_size[0])

# Calcular erro acumulado
erro_acumulado = positions2D[0] - positions2D[-1]

plt.figure(figsize=(8, 6))
plt.plot(positions2D[:, 1], positions2D[:, 0], marker='o')
plt.title('Trajetória de Deslocamento 2D')
plt.xlabel('Deslocamento em Y (px)')
plt.ylabel('Deslocamento em X (px)')
plt.grid()
plt.text(0.05, 0.95, f"Último deslocamento: dx={last_dx_dy[0]:.2f}, dy={last_dx_dy[1]:.2f}\nErro acumulado: dx={erro_acumulado[0]:.2f}, dy={erro_acumulado[1]:.2f}",
         transform=plt.gca().transAxes, fontsize=12, verticalalignment='top', bbox=dict(facecolor='white', alpha=0.5))
plt.axis('equal')
plt.show()