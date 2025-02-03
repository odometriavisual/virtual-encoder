import matplotlib.pyplot as plt
from matplotlib.widgets import Button
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
import pandas as pd
import numpy as np
import time

# Função para criar um cubo em 3D
def create_cube(ax):
    vertices = np.array([
        [-1, -1, -1],
        [1, -1, -1],
        [1, 1, -1],
        [-1, 1, -1],
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1]
    ])
    faces = [
        [vertices[j] for j in [0, 1, 5, 4]],
        [vertices[j] for j in [7, 6, 2, 3]],
        [vertices[j] for j in [0, 4, 7, 3]],
        [vertices[j] for j in [1, 5, 6, 2]],
        [vertices[j] for j in [4, 5, 6, 7]],
        [vertices[j] for j in [0, 1, 2, 3]]
    ]
    face_colors = ['#FF5733', '#33FF57', '#3357FF', '#FFD433', '#B833FF', '#33FFF0']
    cube = Poly3DCollection(faces, alpha=0.85, linewidths=0.7, edgecolors='black')
    cube.set_facecolor(face_colors)
    ax.add_collection3d(cube)
    return cube, vertices

# Função para calcular a matriz de rotação a partir de um quaternion
def quaternion_to_rotation_matrix(qx, qy, qz, qw):
    norm = np.sqrt(qx ** 2 + qy ** 2 + qz ** 2 + qw ** 2)
    qx, qy, qz, qw = qx / norm, qy / norm, qz / norm, qw / norm
    rotation_matrix = np.array([
        [1 - 2 * (qy ** 2 + qz ** 2), 2 * (qx * qy - qz * qw), 2 * (qx * qz + qy * qw)],
        [2 * (qx * qy + qz * qw), 1 - 2 * (qx ** 2 + qz ** 2), 2 * (qy * qz - qx * qw)],
        [2 * (qx * qz - qy * qw), 2 * (qy * qz + qx * qw), 1 - 2 * (qx ** 2 + qy ** 2)]
    ])
    return rotation_matrix

# Validação dos quaternions
def validate_quaternion(qx, qy, qz, qw):
    norm = np.sqrt(qx ** 2 + qy ** 2 + qz ** 2 + qw ** 2)
    if norm == 0:
        raise ValueError("Quaternion com norma zero encontrado.")
    return qx / norm, qy / norm, qz / norm, qw / norm

# Função para atualizar a posição do cubo
def update_cube(cube, vertices, quaternion):
    qx, qy, qz, qw = validate_quaternion(*quaternion)
    rotation_matrix = quaternion_to_rotation_matrix(qx, qy, qz, qw)
    rotated_vertices = np.dot(vertices, rotation_matrix.T)

    faces = [
        [rotated_vertices[j] for j in [0, 1, 5, 4]],
        [rotated_vertices[j] for j in [7, 6, 2, 3]],
        [rotated_vertices[j] for j in [0, 4, 7, 3]],
        [rotated_vertices[j] for j in [1, 5, 6, 2]],
        [rotated_vertices[j] for j in [4, 5, 6, 7]],
        [rotated_vertices[j] for j in [0, 1, 2, 3]]
    ]
    cube.set_verts(faces)

# Função principal para animação
def animate_cube(data):
    fig = plt.figure(figsize=(8, 8), facecolor='gray')
    ax = fig.add_subplot(111, projection='3d', facecolor='gray')

    # Estilizar o eixo
    ax.set_xlim([-1.3, 1.3])
    ax.set_ylim([-1.3, 1.3])
    ax.set_zlim([-1.3, 1.3])
    ax.set_box_aspect([1, 1, 1])  # Aspecto uniforme

    # Remover grade, ticks e rótulos
    ax.axis('off')

    # Criar o cubo
    cube, vertices = create_cube(ax)

    # Carregar timestamps e quaternions
    timestamps = data['timestamp'].values
    quaternions = data[['qx', 'qy', 'qz', 'qw']].values

    # Iniciar a animação
    start_time = time.time()

    def start_animation(event):
        nonlocal start_time
        last_time = start_time
        i = 0

        while i < len(timestamps):
            current_time = time.time()
            elapsed_time = (current_time - start_time) * 1e9  # Convert to nanoseconds

            # Sincronizar com o timestamp
            if elapsed_time >= timestamps[i] - timestamps[0]:
                update_cube(cube, vertices, quaternions[i])
                plt.draw()
                plt.pause(0.05)  # Atualizar a cada 50ms
                i += 1  # Avançar para o próximo timestamp
            else:
                time.sleep(0.001)  # Espera para reduzir o atraso

    # Botão para iniciar a animação
    ax_button = plt.axes([0.85, 0.05, 0.1, 0.075])  # Posição e tamanho do botão
    button = Button(ax_button, 'Iniciar')
    button.on_clicked(start_animation)

    plt.show()

# Ler o arquivo CSV e iniciar a animação
data = pd.read_csv('data/imu.csv')
animate_cube(data)
