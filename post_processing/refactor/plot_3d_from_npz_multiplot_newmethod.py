import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, parent_dir)

import numpy as np
import matplotlib.pyplot as plt
from imu_tools import fast_rot
from typing import Literal
import math
from scipy.spatial.transform import Rotation as R

MethodType = Literal["quiver_unitary", "full_rotation", "full_rotation_2"]

# Carregar os dados do arquivo .npz
txt_file = "last_npz_directory.txt"

try:
    with open(txt_file, "r") as f:
        numpy_folder = f.read().strip()  # Lê o caminho e remove espaços extras
except FileNotFoundError:
    print(f"Arquivo {txt_file} não encontrado. Certifique-se de que o arquivo já foi salvo anteriormente.")
    numpy_folder = None

# Carregar os dados do arquivo NPZ se o diretório for válido
if numpy_folder:
    loaded_data = np.load(numpy_folder, allow_pickle=True)
    print(f"Arquivo NPZ carregado de: {numpy_folder}")
else:
    print("Não foi possível carregar o arquivo NPZ devido a um erro no caminho.")

list_displacements = loaded_data['displacements']
list_quaternions = loaded_data['quaternions']

reorganized_quaternions = np.zeros_like(list_quaternions)

def quaternion_conjugate(q):
    w, x, y, z = q
    return np.array([w, -x, -y, -z])

def quaternion_multiply(q1, q2):
    w1, x1, y1, z1 = q1
    w2, x2, y2, z2 = q2
    return np.array([
        w1*w2 - x1*x2 - y1*y2 - z1*z2,
        w1*x2 + x1*w2 + y1*z2 - z1*y2,
        w1*y2 - x1*z2 + y1*w2 + z1*x2,
        w1*z2 + x1*y2 - y1*x2 + z1*w2
    ])

def rotate_vector(quaternion, vector):
    q_conjugate = quaternion_conjugate(quaternion)
    rotated_vector = quaternion_multiply(quaternion_multiply(quaternion, vector), q_conjugate)
    return rotated_vector[1:]  # Retorna o vetor rotacionado

for i in range(len(list_quaternions)):
    if np.any(list_quaternions[i]):  # Verificar se não é um quaternion zerado
        # Aplicar a permutação desejada:
        # [q1, q2, q3, q4] -> [q2, q4, q1, q3]
        q = list_quaternions[i]
        reorganized_quaternions[i] = np.array([q[0], q[1], q[2], q[3]])

list_quaternions = reorganized_quaternions

# Lista com as variações de deslocamento
variations = [
    [0, 1, 2, 0],  # 0, dx, dy, 0
    [0, 1, 0, 2],  # 0, dx, 0, dy
    [0, 2, 1, 0],  # 0, dy, dx, 0
    [0, 2, 0, 1],  # 0, dy, 0, dx
    [0, 0, 1, 2],  # 0, 0, dx, dy
    [0, 0, 2, 1]  # 0, 0, dy, dx
]

# Mapeamento para exibir dx, dy e 0 nos títulos
value_map = {
    0: '0',
    1: 'dx',
    2: 'dy'
}

# Configurar o gráfico 3D com subplots
fig = plt.figure(figsize=(18, 12))


# Função para calcular e plotar a trajetória
def calculate_and_plot(rotation_base_1, rotation_base_2, ax, title, method: MethodType, dx_dy_multiplyer):
    trajectory = []
    position = np.array([0.0, 0.0, 0.0])
    last_quat = None

    print(rotation_base_1)
    print(rotation_base_2)
    print("")

    # Iterar sobre os deslocamentos e quaternions
    for displacement, quaternion in zip(list_displacements, list_quaternions):
        norm = np.linalg.norm(quaternion)
        if norm < 0.5:
            quaternion_normalized = last_quat
        else:
            quaternion_normalized = quaternion / norm
            last_quat = quaternion_normalized

        dx, dy = displacement * dx_dy_multiplyer

        if method == "quiver_unitary":
            quiver_position_1 = fast_rot(quaternion_normalized, rotation_base_1)
            quiver_position_2 = fast_rot(quaternion_normalized, rotation_base_2)
            dx_influence = quiver_position_1 * dx
            dy_influence = quiver_position_2 * dy
            displacement_3d = dx_influence + dy_influence
        elif method == "full_rotation":
            rotation_base_dx = np.array(rotation_base_1) * dx
            rotation_base_dy = np.array(rotation_base_2) * dy * (-1)
            disp = rotation_base_dx + rotation_base_dy
            displacement_3d = fast_rot(quaternion_normalized, disp)
        elif method == "full_rotation_2":
            rotation_base_dx = np.array(rotation_base_1) * dx
            rotation_base_dy = np.array(rotation_base_2) * dy
            disp = rotation_base_dx + rotation_base_dy
            displacement_3d = rotate_vector(quaternion_normalized, disp)
        elif method == "quiver_unitary_2":
            quiver_position_1 = rotate_vector(quaternion_normalized, rotation_base_1)
            quiver_position_2 = rotate_vector(quaternion_normalized, rotation_base_2)
            dx_influence = quiver_position_1 * dx
            dy_influence = quiver_position_2 * dy

            displacement_3d = dx_influence + dy_influence
        elif method == "scipy_unitary":
            r = R.from_quat(quaternion_normalized, scalar_first=True)
            quiver_position_1 = r.apply([rotation_base_1[1], rotation_base_1[2], rotation_base_1[3]])
            r = R.from_quat(quaternion_normalized, scalar_first=True)
            quiver_position_2 = r.apply([rotation_base_2[1], rotation_base_2[2], rotation_base_2[3]])
            dx_influence = quiver_position_1 * dx
            dy_influence = quiver_position_2 * dy
            displacement_3d = dx_influence + dy_influence
        else:
            raise Exception("function calculate_and_plot invalid method")

        # Acumular o deslocamento
        position += displacement_3d

        # Armazenar a posição acumulada
        trajectory.append(position.copy())

    trajectory = np.array(trajectory)

    # Plotar a trajetória 3D
    ax.plot(trajectory[:, 0], trajectory[:, 1], trajectory[:, 2], label=title)

    # Limites automáticos com a escala preservada
    x_min, x_max = np.min(trajectory[:, 0]), np.max(trajectory[:, 0])
    y_min, y_max = np.min(trajectory[:, 1]), np.max(trajectory[:, 1])
    z_min, z_max = np.min(trajectory[:, 2]), np.max(trajectory[:, 2])

    # Calculando a extensão dos eixos
    max_range = max(x_max - x_min, y_max - y_min, z_max - z_min)

    # Ajustando os limites para que todos os eixos tenham a mesma escala
    ax.set_xlim([x_min - max_range * 0.1, x_max + max_range * 0.1])
    ax.set_ylim([y_min - max_range * 0.1, y_max + max_range * 0.1])
    ax.set_zlim([z_min - max_range * 0.1, z_max + max_range * 0.1])

    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Z')
    ax.set_title(title)
    ax.legend()

    # Mostrar o deslocamento total (última posição)
    final_position = position
    ax.text(
        final_position[0], final_position[1], final_position[2],
        f'({final_position[0]:.1f}, {final_position[1]:.1f}, {final_position[2]:.1f})',
        color='red'
    )

    # Calcular o erro normalizado
    error = np.linalg.norm(final_position) / 100
    ax.text(
        -50, -500, 0.0,  # Posição do texto abaixo do título
        f'Erro normalizado: {error:.2f}%',  # Texto com o erro normalizado, agora com 2 casas decimais
        color='blue', ha='center', va='center', transform=ax.transAxes
    )

num_variations = len(variations)
cols = math.ceil(math.sqrt(num_variations))  # Define o número de colunas como a raiz arredondada para cima
rows = math.ceil(num_variations / cols)  # Calcula o número de linhas necessário

for i, order in enumerate(variations):
    ax = fig.add_subplot(rows, cols, i+1, projection='3d')

    rotation_base_1 = [0, 0, 0, 0]
    rotation_base_1[order[1] + 1] = 1
    rotation_base_2 = [0, 0, 0, 0]
    rotation_base_2[order[2] + 1] = 1

    title_values = [value_map[order[1]], value_map[order[2]], value_map[order[3]]]
    title = f'[{", ".join(title_values)}]'
    calculate_and_plot(rotation_base_1, rotation_base_2, ax, title, method="quiver_unitary", dx_dy_multiplyer = [1,1])

# Ajustar layout e mostrar o gráfico
plt.tight_layout()
plt.show()
