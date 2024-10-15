import glob
import os
import time
import csv
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime

from visual_odometer import VisualOdometer
from visual_odometer.preprocessing import image_preprocessing
from visual_odometer.displacement_estimators.svd import svd_method


def load(filename):
    from PIL import Image, ImageOps
    img_array_rgb = Image.open(filename)
    img_grayscale = ImageOps.grayscale(img_array_rgb)
    img_array = np.asarray(img_grayscale)
    return img_array


def preprocessing(img_array):
    pre_processed_img = image_preprocessing(img_array)
    return pre_processed_img


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
    # Encontre o timestamp de IMU mais próximo da imagem
    closest_data = min(imu_data, key=lambda x: abs(x['timestamp'] - img_timestamp))
    return closest_data


image_folder = 'C:/Users/Daniel Santin/PycharmProjects/virtual-encoder2/post_processing/data/picam_imgs/1_20241014_180236'
imu_file = image_folder + "/imu.csv"

# Carregar dados da IMU
imu_data = load_imu_data(imu_file)

# Carregar imagens
image_files = sorted(glob.glob(os.path.join(image_folder, '*.jpg')))
img_stream = [load(img_file) for img_file in image_files]
img_preprocessed_list = [preprocessing(img_array) for img_array in img_stream]

img_size = img_stream[0].shape
old_processed_img = img_preprocessed_list.pop(0)

# Inicializar posição
positions = [(0, 0)]  # Começa na posição (0, 0)
current_position = np.array([0.0, 0.0])  # Usando um array numpy para facilitar os cálculos

# Processamento de deslocamento para cada imagem
for img_preprocessed, img_file in zip(img_preprocessed_list, image_files):
    img_timestamp = int(os.path.basename(img_file).split('.')[0])
    closest_imu_data = find_closest_imu_data(imu_data, img_timestamp)

    dx, dy = svd_method(img_preprocessed, old_processed_img, img_size[1], img_size[0])

    # Atualizar posição atual
    current_position += np.array([dx, dy])
    positions.append((current_position[0], current_position[1]))  # Adicionar nova posição à lista

    old_processed_img = img_preprocessed

# Converter a lista de posições para um array numpy para facilitar a plotagem
positions = np.array(positions)

# Plotar a trajetória
plt.figure(figsize=(10, 6))
plt.plot(positions[:, 0], positions[:, 1], marker='o')
plt.title('Trajetória de Deslocamento')
plt.xlabel('Deslocamento em X')
plt.ylabel('Deslocamento em Y')
plt.grid()
plt.axis('equal')  # Manter a proporção
plt.show()
