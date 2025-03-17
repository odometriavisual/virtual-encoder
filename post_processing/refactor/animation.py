import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
from scipy.spatial.transform import Rotation as R
from imu_tools import fast_rot

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

list_displacements_2d = loaded_data['displacements']
list_quaternions = loaded_data['quaternions']

def calculate_displacements(positions):
    displacements = np.diff(positions, axis=0)  # Diferença entre posições consecutivas
    return displacements

def quaternion_conjugate(q):
    w, x, y, z = q
    return np.array([w, -x, -y, -z])

def quaternion_multiply(q1, q2):
    w1, x1, y1, z1 = q1
    w2, x2, y2, z2 = q2
    return np.array([
        w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2,
        w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2,
        w1 * y2 - x1 * z2 + y1 * w2 + z1 * x2,
        w1 * z2 + x1 * y2 - y1 * x2 + z1 * w2
    ])

def rotate_vector(quaternion, vector):
    q_conjugate = quaternion_conjugate(quaternion)
    rotated_vector = quaternion_multiply(quaternion_multiply(quaternion, vector), q_conjugate)
    return rotated_vector[1:]  # Retorna o vetor rotacionado

# Função para criar um cubo unitário centrado na origem
def create_cube(size):
    return np.array([[-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5],
                     [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5]]) * size

# Função para rotacionar e transladar o cubo
def transform_cube(cube, quaternion, position):
    r = R.from_quat(quaternion, scalar_first=True)
    rotated_cube = r.apply(cube)  # Aplica a rotação
    return rotated_cube + position  # Aplica a translação

def calculate_trajectory(rotation_base_1, rotation_base_2, method, dx_dy_multiplyer):
    trajectory = []
    quiver_unitary_list_x = []
    quiver_unitary_list_y = []
    position = np.array([0.0, 0.0, 0.0])
    last_quat = None

    print(rotation_base_1)
    print(rotation_base_2)
    print("")

    # Iterar sobre os deslocamentos e quaternions
    for displacement, quaternion in zip(list_displacements_2d, list_quaternions):
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

        if method == "quiver_unitary" or method == "quiver_unitary_2" or method == "scipy_unitary":
            quiver_unitary_list_x.append(dx_influence)
            quiver_unitary_list_y.append(dy_influence)

        # Acumular o deslocamento
        position += displacement_3d

        # Armazenar a posição acumulada
        trajectory.append(position.copy())

    trajectory = np.array(trajectory)
    return trajectory, quiver_unitary_list_x, quiver_unitary_list_y

# Função de atualização da animação
# Função de atualização da animação
last_arrow = None
last_arrow_x = None
last_arrow_y = None
def update(frame):
    global last_arrow, last_arrow_x, last_arrow_y
    # Atualiza a trajetória
    trajectory.set_data(list_displacements_3d[:frame + 1, 0], list_displacements_3d[:frame + 1, 1])
    trajectory.set_3d_properties(list_displacements_3d[:frame + 1, 2])

    # Transforma o cubo
    transformed_cube = transform_cube(cube_vertices, list_quaternions[frame], list_displacements_3d[frame])

    # Atualiza os polígonos do cubo
    faces = [[transformed_cube[j] for j in [0, 1, 2, 3]],
             [transformed_cube[j] for j in [4, 5, 6, 7]],
             [transformed_cube[j] for j in [0, 1, 5, 4]],
             [transformed_cube[j] for j in [2, 3, 7, 6]],
             [transformed_cube[j] for j in [0, 3, 7, 4]],
             [transformed_cube[j] for j in [1, 2, 6, 5]]]

    cube_poly.set_verts(faces)

    # Atualiza o cubo no segundo plot
    transformed_cube_right = transform_cube(cube_vertices, list_quaternions[frame], [0, 0, 0])  # Sem deslocamento
    faces_right = [[transformed_cube_right[j] for j in [0, 1, 2, 3]],
                   [transformed_cube_right[j] for j in [4, 5, 6, 7]],
                   [transformed_cube_right[j] for j in [0, 1, 5, 4]],
                   [transformed_cube_right[j] for j in [2, 3, 7, 6]],
                   [transformed_cube_right[j] for j in [0, 3, 7, 4]],
                   [transformed_cube_right[j] for j in [1, 2, 6, 5]]]

    cube_poly_right.set_verts(faces_right)

    # Soma o deslocamento dos últimos 10 frames para a seta
    num_frames = 5
    start_idx = max(0, frame - num_frames + 1)  # Garante que não há índice negativo
    end_idx = frame + num_frames
    displacement_sum = np.sum(displacements[start_idx:end_idx + 1], axis=0)

    # Atualiza a seta
    if frame == 0:  # Se for o primeiro frame, inicie a seta a partir da origem
        last_arrow = ax2.quiver(0, 0, 0, displacement_sum[0], displacement_sum[1], displacement_sum[2],
                   color='black', linewidth=2, label="Soma Deslocamento 3D")
    else:
        last_arrow.remove()
        last_arrow = ax2.quiver(0, 0, 0, displacement_sum[0], displacement_sum[1], displacement_sum[2],
                   color='black', linewidth=2)

    if True:
        if last_arrow_x is not None:
            last_arrow_x.remove()
            last_arrow_y.remove()
        quiver_sum_x = np.sum(quiver_unitary_list_x[start_idx:end_idx + 1], axis=0)
        quiver_sum_y = np.sum(quiver_unitary_list_y[start_idx:end_idx + 1], axis=0)
        last_arrow_x = ax2.quiver(0, 0, 0, quiver_sum_x[0], quiver_sum_x[1], quiver_sum_x[2],color='red', linewidth=2)
        last_arrow_y = ax2.quiver(0, 0, 0, quiver_sum_y[0], quiver_sum_y[1], quiver_sum_y[2],color='red', linewidth=2)

    # Ajustando os limites para que todos os eixos tenham a mesma escala
    ax1.set_xlim(list_displacements_3d[frame][0] - 500, list_displacements_3d[frame][0] + 500)
    ax1.set_ylim(list_displacements_3d[frame][1] - 500, list_displacements_3d[frame][1] + 500)
    ax1.set_zlim(list_displacements_3d[frame][2] - 500, list_displacements_3d[frame][2] + 500)

    return trajectory, cube_poly, cube_poly_right

order = [0, 1, 0, 2]

rotation_base_1 = [0, 0, 0, 0]
rotation_base_1[order[1] + 1] = 1
rotation_base_2 = [0, 0, 0, 0]
rotation_base_2[order[2] + 1] = 1

list_displacements_3d, quiver_unitary_list_x, quiver_unitary_list_y = calculate_trajectory(rotation_base_1,
                                                                                           rotation_base_2,
                                                                                           method="quiver_unitary_2"
                                                                                           ,dx_dy_multiplyer=[1, 1]
                                                                                           )



displacements = calculate_displacements(list_displacements_3d)

# Configuração da figura
fig = plt.figure(figsize=(10, 5))  # Tamanho maior para dois subplots

# Subplot 1 (à esquerda) - Trajetória + cubo com rotação
ax1 = fig.add_subplot(121, projection='3d')

# Inicializar cubo e trajetória
face_colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple']
cube_vertices = create_cube(size=50)

trajectory, = ax1.plot([], [], [], 'b-', label="Trajectory", linewidth=2)  # Trajetória (3D)
cube_poly = Poly3DCollection([], facecolors=face_colors, linewidths=1, edgecolors='k', alpha=0.7)
ax1.add_collection3d(cube_poly)

# Subplot 2 (à direita) - Cubo sem rotação
ax2 = fig.add_subplot(122, projection='3d')
cube_poly_right = Poly3DCollection([], facecolors=face_colors, linewidths=1, edgecolors='k', alpha=0.7)
ax2.add_collection3d(cube_poly_right)

ax2.set_ylim(-50,50)
ax2.set_xlim(-50,50)
ax2.set_zlim(-50,50)

# Animação
ani = animation.FuncAnimation(fig, update, frames=len(list_displacements_3d), interval=5, blit=False)

plt.show()
