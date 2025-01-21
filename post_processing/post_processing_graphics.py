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


from PIL import Image, ImageOps, ImageEnhance

DEFAULT_CONFIG = {
    "Displacement Estimation": {
        "method": "svd",
        "params": {}
    },
    "Frequency Window": {
        "method": "Stone et al 2007",
        "params": {}
    },
    "Spatial Window": {
        "method": "",
        "params": {}
    },
    "Downsampling": {
        "method": "",
        "params": {
            "factor": 1,
        }
    },
}
def load_image(filename):
    # Abrir imagem em RGB
    img_rgb = Image.open(filename)

    # Melhorar o brilho e o contraste
    enhancer_brightness = ImageEnhance.Brightness(img_rgb)
    img_rgb = enhancer_brightness.enhance(1.5)  # Ajuste o valor para mais brilho (1.0 é padrão)

    enhancer_contrast = ImageEnhance.Contrast(img_rgb)
    img_rgb = enhancer_contrast.enhance(1.5)  # Ajuste o valor para mais contraste

    # Converter para escala de cinza
    img_grayscale = ImageOps.grayscale(img_rgb)


    # Converter para matriz NumPy
    img_array = np.asarray(img_grayscale)

    # img_array = img_array / 255.0

    return img_array


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


image_folder = 'C:/Users/dsant/Downloads/Ensaio - Encerramento - 2024-20250116T221232Z-001/Ensaio - Encerramento - 2024/61_20241220T153234'
imu_file = image_folder + "/imu.csv"

# Carregar dados da IMU
imu_data = load_imu_data(imu_file)

# Carregar imagens
image_files = sorted(glob.glob(os.path.join(image_folder, '*.jpg')))
loaded_images =[load_image(img_file) for img_file in image_files]
img_stream = [image_preprocessing(img_array, DEFAULT_CONFIG) for img_array in loaded_images]

img_size = img_stream[0].shape
old_processed_img = img_stream.pop(0)
old_img = loaded_images.pop(0)

# Inicializar posição
positions2D = [(0, 0, 0)]
positions3D = [(0, 0, 0)]  # Começa na posição (0, 0, 0)
current_position3D = np.array([0.0, 0.0, 0.0])  # Usando um array numpy para facilitar os cálculos
current_position2D = np.array([0.0, 0.0, 0.0])

# Processamento de deslocamento para cada imagem
# Pasta para salvar as visualizações
output_folder = "output_visualizations"
os.makedirs(output_folder, exist_ok=True)

# Processamento de deslocamento para cada imagem
for i, (img_preprocessed, img_array, img_file) in enumerate(zip(img_stream, loaded_images, image_files[1:]), start=1):
    img_timestamp = int(os.path.basename(img_file).split('.')[0])
    closest_imu_data = find_closest_imu_data(imu_data, img_timestamp)

    # Obter dx e dy usando SVD
    dx, dy, qu, qv, ang_qu, ang_qv, yy, ymu, xy, xmu = svd_method(
        img_preprocessed, old_processed_img, img_size[1], img_size[0], debug=True
    )

    # Extrair os dados do IMU
    qx = closest_imu_data['qx']
    qy = closest_imu_data['qy']
    qz = closest_imu_data['qz']
    qw = closest_imu_data['qw']

    # Calcular a matriz de rotação a partir do quaternion
    rotation_matrix = quaternion_to_rotation_matrix([qx, qy, qz, qw])

    # Transformar dx, dy para 3D usando a matriz de rotação
    displacement_2d = np.array([dx, dy, 0.0])  # Adiciona 0 para a dimensão Z inicialmente
    displacement_3d = rotation_matrix @ displacement_2d  # Multiplicação de matriz para aplicar a rotação

    # Atualizar a posição atual
    current_position2D += displacement_2d
    current_position3D += displacement_3d

    positions2D.append((current_position2D[0], current_position2D[1], current_position2D[2]))
    positions3D.append((current_position3D[0], current_position3D[1], current_position3D[2]))

    # Gerar a visualização
    fig, axes = plt.subplots(2, 3, figsize=(15, 10))

    # Imagem atual e próxima
    axes[0, 0].imshow(old_img, cmap='gray')
    axes[0, 0].set_title("Imagem Atual")

    axes[1, 0].imshow(img_array, cmap='gray')
    axes[1, 0].set_title("Próxima Imagem")

    # Visualizar ang_qu e ang_qv
    axes[0, 1].plot(ang_qu)
    axes[0, 1].set_title("ang_qu")

    axes[1, 1].plot(ang_qv)
    axes[1, 1].set_title("ang_qv")

    # Criar os dados simulados
    y = np.arange(len(yy))  # Usar o tamanho de yy como o domínio
    reta_qv = ymu * y  # Apenas inclinação mu, sem offset (c = 0)

    # Plotar ang_qv com a reta mu
    axes[0, 2].plot(yy, label="qv filtrado")
    axes[0, 2].plot(y, reta_qv, color='r', linestyle='--', label=f"mu={xmu:.2f}")
    axes[0, 2].set_title("ang_qv")
    axes[0, 2].legend()

    # Criar os dados simulados
    x = np.arange(len(xy))  # Usar o tamanho de yy como o domínio
    reta_qv = xmu * x  # Apenas inclinação mu, sem offset (c = 0)

    # Plotar ang_qv com a reta mu
    axes[1, 2].plot(xy, label="qv filtrado")
    axes[1, 2].plot(x, reta_qv, color='r', linestyle='--', label=f"mu={xmu:.2f}")
    axes[1, 2].set_title("ang_qv")
    axes[1, 2].legend()

    # Ajustar layout e salvar
    plt.tight_layout()
    output_path = os.path.join(output_folder, f"visualization_{i}.png")
    plt.savefig(output_path)
    plt.close(fig)

    # Atualizar a imagem processada
    old_processed_img = img_preprocessed
    old_img = img_array
