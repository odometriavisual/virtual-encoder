import numpy as np
import matplotlib.pyplot as plt

# Carregar os dados do arquivo .npz
loaded_data = np.load('displacements_data.npz', allow_pickle=True)
list_displacements = loaded_data['displacements']
list_quaternions = loaded_data['quaternions']


# Funções auxiliares
def cross(x, y):
    return np.array((x[1] * y[2] - x[2] * y[1], x[2] * y[0] - x[0] * y[2], x[0] * y[1] - x[1] * y[0]))


def fast_rot(q, v):
    t = 2 * cross(q[1:], v[1:])
    R = v[1:] + q[0] * t + cross(q[1:], t)
    return R


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
    2: '-dy'
}

# Configurar o gráfico 3D com subplots
fig = plt.figure(figsize=(18, 12))


# Função para calcular e plotar a trajetória
def calculate_and_plot(order, ax, title):
    trajectory = []
    position = np.array([0.0, 0.0, 0.0])
    last_quat = None

    # Iterar sobre os deslocamentos e quaternions
    for displacement, quaternion in zip(list_displacements, list_quaternions):
        norm = np.linalg.norm(quaternion)
        if norm < 0.5:
            quaternion_normalized = last_quat
        else:
            quaternion_normalized = quaternion / norm
            last_quat = quaternion_normalized

        dx, dy = displacement
        disp = [0, 0, 0, 0]
        disp[order[1] + 1] = dx
        disp[order[2] + 1] = -dy
        displacement_3d = fast_rot(quaternion_normalized, disp)

        # Acumular o deslocamento
        position += displacement_3d

        # Armazenar a posição acumulada
        trajectory.append(position.copy())

    trajectory = np.array(trajectory)

    # Plotar a trajetória 3D
    ax.plot(trajectory[:, 0], trajectory[:, 1], trajectory[:, 2], label=title)
    ax.set_xlim([-1500, 1500])
    ax.set_ylim([-1500, 1500])
    ax.set_zlim([-1500, 1500])
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

# Criar subplots para cada variação
for i, order in enumerate(variations):
    ax = fig.add_subplot(2, 3, i + 1, projection='3d')
    title_values = [value_map[order[1]], value_map[order[2]], value_map[order[3]]]
    title = f'[{", ".join(title_values)}]'
    calculate_and_plot(order, ax, title)

# Ajustar layout e mostrar o gráfico
plt.tight_layout()
plt.show()
