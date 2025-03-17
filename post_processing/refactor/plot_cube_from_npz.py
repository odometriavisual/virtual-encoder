import numpy as np
import time
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
from matplotlib.widgets import Button, Slider
from imu_tools import fast_rot

displacement_arrow_1 = None
displacement_arrow_2 = None
displacement_arrow_3 = None

last_origin = np.array([0,0,0])
rotation_base_1 = np.array([0,1,0,0])
rotation_base_2 = np.array([0,0,0,1])

last_valid_quaternion = None
next_valid_quaternion = None


def smooth_vector(data_list, current_index, window_size=5):
    """
    Calcula a média móvel centrada de um vetor em uma lista.

    Args:
        data_list: Lista de vetores numpy
        current_index: Índice atual para calcular a média
        window_size: Tamanho da janela para cada lado (anterior e posterior)

    Returns:
        Vetor numpy com a média calculada
    """
    # Determina os limites da janela
    start_idx = max(0, current_index - window_size)
    end_idx = min(len(data_list), current_index + window_size + 1)

    # Coleta os vetores na janela
    vectors = []
    for i in range(start_idx, end_idx):
        if i < len(data_list):  # Verificação de segurança
            vector = data_list[i]
            if not np.any(np.isnan(vector)):  # Ignora vetores com NaN
                vectors.append(vector)

    # Se não houver vetores válidos, retorna o vetor original ou zeros
    if not vectors:
        return data_list[current_index] if current_index < len(data_list) else np.zeros(3)

    # Calcula a média
    return np.mean(vectors, axis=0)


def create_cube(ax):
    vertices = np.array([[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
                         [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]])
    faces = [[vertices[j] for j in [0, 1, 5, 4]], [vertices[j] for j in [7, 6, 2, 3]],
             [vertices[j] for j in [0, 4, 7, 3]], [vertices[j] for j in [1, 5, 6, 2]],
             [vertices[j] for j in [4, 5, 6, 7]], [vertices[j] for j in [0, 1, 2, 3]]]
    face_colors = ['#FF5733', '#33FF57', '#3357FF', '#FFD433', '#B833FF', '#33FFF0']
    cube = Poly3DCollection(faces, alpha=1, edgecolors='black', facecolors=face_colors)
    ax.add_collection3d(cube)
    return cube, vertices

def is_valid_quaternion(quaternion):
    """Verifica se o quaternion contém valores válidos (não NaN ou Inf)."""
    try:
        quaternion /= np.linalg.norm(quaternion)
    except:
        return False
    return np.all(np.isfinite(quaternion))


def interpolate_quaternions(q1, q2, alpha):
    """Interpolação linear entre dois quaternions."""
    return (1 - alpha) * q1 + alpha * q2


def update_cube(cube, vertices, quaternion, ax, displacement_2d, current_index):
    global displacement_arrow_1, displacement_arrow_2, displacement_arrow_3, rotation_base_1, rotation_base_2
    global list_quaternions, list_displacements  # Precisamos acessar estas listas

    quaternion /= np.linalg.norm(quaternion)
    rotated_vertices = [fast_rot(quaternion, [0,v[0],v[1],v[2]]) for v in vertices]
    faces = [[rotated_vertices[j] for j in face] for face in [[0, 1, 5, 4], [7, 6, 2, 3],
                                                              [0, 4, 7, 3], [1, 5, 6, 2],
                                                              [4, 5, 6, 7], [0, 1, 2, 3]]]
    cube.set_verts(faces)

    if displacement_arrow_1 is not None:
        displacement_arrow_1.remove()
        displacement_arrow_2.remove()
        displacement_arrow_3.remove()


    smoothed_positions = []

    # Calcular quiver_position_1 suavizado (com base na rotação)
    quiver_positions_1 = []
    quiver_positions_2 = []

    window_size = 20
    start_idx = max(0, current_index - window_size)
    end_idx = min(len(list_displacements), current_index + window_size + 1)

    for i in range(start_idx, end_idx):
        if i < len(list_quaternions) and i < len(list_displacements):
            q = list_quaternions[i]
            dx, dy = list_displacements[i]

            if is_valid_quaternion(q):
                pos1 = fast_rot(q, rotation_base_1) * dx / 3
                pos2 = fast_rot(q, rotation_base_2) * dy / 3

                if not np.any(np.isnan(pos1)) and not np.any(np.isnan(pos2)):
                    quiver_positions_1.append(pos1)
                    quiver_positions_2.append(pos2)

    # Calcular médias se temos vetores válidos
    if quiver_positions_1 and quiver_positions_2:
        quiver_position_1 = np.mean(quiver_positions_1, axis=0)
        quiver_position_2 = np.mean(quiver_positions_2, axis=0)
        quiver_position_3 = quiver_position_1 + quiver_position_2
    else:
        # Usar o cálculo original se não houver dados suficientes para média
        dx, dy = displacement_2d
        quiver_position_1 = fast_rot(quaternion, rotation_base_1) * dx / 3
        quiver_position_2 = fast_rot(quaternion, rotation_base_2) * dy / 3
        quiver_position_3 = quiver_position_1 + quiver_position_2


    displacement_arrow_1 = ax.quiver(0,0,0,quiver_position_1[0],quiver_position_1[1],quiver_position_1[2], color='red')
    displacement_arrow_2 = ax.quiver(0,0,0,quiver_position_2[0],quiver_position_2[1],quiver_position_2[2], color='green')
    displacement_arrow_3 = ax.quiver(0,0,0,quiver_position_3[0],quiver_position_3[1],quiver_position_3[2], color='blue')


def draw_arrows_up_to_current(ax, index):
    """Desenha as flechas até o ponto atual com suavização."""
    global last_origin, list_displacements, list_quaternions
    # ax.cla()  # Limpa a tela para desenhar tudo novamente
    #
    # ax.set_xlim(-200, 200)
    # ax.set_ylim(-200, 200)
    # ax.set_zlim(-200, 200)
    # ax.axis('off')

    # # Inicializa a origem
    # origin = np.array([0, 0, 0])
    # path_points = [origin.copy()]  # Armazena todos os pontos para desenhar uma linha suave

    # # Calcula todos os pontos da trajetória até o índice atual
    # for i in range(0, index + 1):
    #     if i >= len(list_displacements) or i >= len(list_quaternions):
    #         break
    #
    #     dx, dy = list_displacements[i]
    #     quatenrion = list_quaternions[i]
    #     smoothed_quat = None
    #     smoothed_displacement = None
    #
    #     # Calcula quaternion suavizado
    #     valid_quats = []
    #     window_size = 5
    #     start_idx = max(0, i - window_size)
    #     end_idx = min(len(list_quaternions), i + window_size + 1)
    #
    #     for j in range(start_idx, end_idx):
    #         if j < len(list_quaternions) and is_valid_quaternion(list_quaternions[j]):
    #             valid_quats.append(list_quaternions[j])
    #
    #     if valid_quats:
    #         # Média de quaternions (isso é uma simplificação, idealmente deveria ser SLERP)
    #         smoothed_quat = np.mean(valid_quats, axis=0)
    #         smoothed_quat /= np.linalg.norm(smoothed_quat)
    #     else:
    #         smoothed_quat = list_quaternions[i]
    #
    #     # Calcula o deslocamento
    #     quiver_position_1 = fast_rot(smoothed_quat, rotation_base_1)
    #     quiver_position_2 = fast_rot(smoothed_quat, rotation_base_2)
    #
    #     dx_influence = quiver_position_1 * dx
    #     dy_influence = quiver_position_2 * dy
    #
    #     displacement_3d = dx_influence + dy_influence
    #
    #     if not np.any(np.isnan(displacement_3d)):
    #         origin = origin + displacement_3d
    #         path_points.append(origin.copy())
    #
    # # Desenha a linha da trajetória
    # if len(path_points) > 1:
    #     path_points = np.array(path_points)
    #     #ax.plot(path_points[:, 0], path_points[:, 1], path_points[:, 2], 'b-', linewidth=2)
    #
    # # Atualiza a última origem
    # last_origin = origin


def animate_cube(quaternions, timestamps, displacements):
    fig = plt.figure(figsize=(12, 8))

    # Subplot para o cubo com as flechas
    ax1 = fig.add_subplot(121, projection='3d')
    ax1.set_xlim([-1.3, 1.3])
    ax1.set_ylim([-1.3, 1.3])
    ax1.set_zlim([-1.3, 1.3])
    ax1.axis('off')
    cube, vertices = create_cube(ax1)

    # Subplot para as últimas 10 flechas
    ax2 = fig.add_subplot(122, projection='3d')
    ax2.set_xlim([-1.3, 1.3])
    ax2.set_ylim([-1.3, 1.3])
    ax2.set_zlim([-1.3, 1.3])
    ax2.axis('off')

    playing = [False]
    index = [0]

    def update_frame(val):
        global last_valid_quaternion, next_valid_quaternion
        index[0] = int(val)

        current_quaternion = quaternions[index[0]]

        if not is_valid_quaternion(current_quaternion):
            if last_valid_quaternion is not None and next_valid_quaternion is not None:
                alpha = (timestamps[index[0]] - timestamps[index[0] - 1]) / (
                        timestamps[index[0] + 1] - timestamps[index[0] - 1])
                interpolated_quaternion = interpolate_quaternions(last_valid_quaternion, next_valid_quaternion, alpha)
                current_quaternion = interpolated_quaternion
            else:
                return

        last_valid_quaternion = current_quaternion
        if index[0] + 1 < len(quaternions):
            next_valid_quaternion = quaternions[index[0] + 1]

        # Atualiza o cubo

        update_cube(cube, vertices, current_quaternion, ax1, displacements[index[0]], index[0])

        # Atualiza as flechas na visualização
        # draw_arrows_up_to_current(ax2, index[0])

        plt.draw()

    def toggle_play(event):
        playing[0] = not playing[0]
        button_play.label.set_text("Pause" if playing[0] else "Play")

    ax_play = plt.axes([0.85, 0.05, 0.1, 0.075])
    button_play = Button(ax_play, 'Play')
    button_play.on_clicked(toggle_play)

    ax_slider = plt.axes([0.2, 0.02, 0.6, 0.03])
    slider = Slider(ax_slider, 'Time', 0, len(quaternions) - 1, valinit=0, valstep=1)
    slider.on_changed(update_frame)

    start_time = time.time()
    while True:
        if playing[0]:
            elapsed_time = (time.time() - start_time) * 1e9
            idx = np.searchsorted(timestamps, timestamps[0] + elapsed_time, side="right") - 1
            if 0 <= idx < len(quaternions):
                slider.set_val(idx)
        plt.pause(0.05)
    plt.show()


# Carrega os dados de quaternions, timestamps e deslocamentos
loaded_data = np.load('displacements_data.npz', allow_pickle=True)
list_quaternions = loaded_data['quaternions']

# Reorganizar os quaternions conforme a permutação desejada
# reorganized_quaternions = np.zeros_like(list_quaternions)
#
# for i in range(len(list_quaternions)):
#     if np.any(list_quaternions[i]):  # Verificar se não é um quaternion zerado
#         # Aplicar a permutação desejada:
#         # [q1, q2, q3, q4] -> [q2, q4, q1, q3]
#         q = list_quaternions[i]
#         reorganized_quaternions[i] = np.array([q[1], q[3], q[0], q[2]])

list_timestamps = loaded_data['timestamps'].astype(np.float64)
list_displacements = loaded_data['displacements']
animate_cube(list_quaternions, list_timestamps, list_displacements)
