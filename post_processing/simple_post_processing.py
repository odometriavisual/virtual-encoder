import glob
import os
import time
import csv
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D  # Importar para visualização 3D
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


def quaternion_to_rotation_matrix(q):
    """Converte um quaternion para uma matriz de rotação 3x3."""
    qx, qy, qz, qw = q
    return np.array([
        [1 - 2 * (qy ** 2 + qz ** 2), 2 * (qx * qy - qw * qz), 2 * (qx * qz + qw * qy)],
        [2 * (qx * qy + qw * qz), 1 - 2 * (qx ** 2 + qz ** 2), 2 * (qy * qz - qw * qx)],
        [2 * (qx * qz - qw * qy), 2 * (qy * qz + qw * qx), 1 - 2 * (qx ** 2 + qy ** 2)]
    ])


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
positions2D = [(0, 0, 0)]
positions3D = [(0, 0, 0)]  # Começa na posição (0, 0, 0)
current_position3D = np.array([0.0, 0.0, 0.0])  # Usando um array numpy para facilitar os cálculos
current_position2D = np.array([0.0, 0.0, 0.0])

# Processamento de deslocamento para cada imagem
for img_preprocessed, img_file in zip(img_preprocessed_list, image_files):
    img_timestamp = int(os.path.basename(img_file).split('.')[0])
    closest_imu_data = find_closest_imu_data(imu_data, img_timestamp)

    # Obter dx e dy usando SVD
    dx, dy = svd_method(img_preprocessed, old_processed_img, img_size[1], img_size[0])

    # Extrair os dados do IMU
    qx = closest_imu_data['qx']
    qy = closest_imu_data['qy']
    qz = closest_imu_data['qz']
    qw = closest_imu_data['qw']

    # Calcular a matriz de rotação a partir do quaternion
    rotation_matrix = quaternion_to_rotation_matrix([qx, qy, qz, qw])

    # Transformar dx, dy para 3D usando a matriz de rotação
    displacement_2d = np.array([dx, dy, 0.0])  # Adiciona 0 para a dimensão Z inicialmente
    displacement_3d = rotation_matrix @ displacement_2d  # Multiplicação de matriz para aplicar a rotação, é o mesmo que np.dot()

    # Atualizar a posição atual
    current_position2D += displacement_2d
    current_position3D += displacement_3d

    positions2D.append((current_position2D[0], current_position2D[1], current_position2D[2]))
    positions3D.append((current_position3D[0], current_position3D[1], current_position3D[2]))


    old_processed_img = img_preprocessed

# Converter a lista de posições para um array numpy para facilitar a plotagem
positions3D = np.array(positions3D)
positions2D = np.array(positions2D)

# Plotar a trajetória em 3D
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')
ax.plot(positions3D[:, 0], positions3D[:, 1], positions3D[:, 2], marker='o')
ax.set_title('Trajetória de Deslocamento 3D')
ax.set_xlabel('Deslocamento em X px')
ax.set_ylabel('Deslocamento em Y px')
ax.set_zlabel('Deslocamento em Z px')
ax.grid()
plt.show()
