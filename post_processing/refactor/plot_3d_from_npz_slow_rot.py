import numpy as np
import matplotlib.pyplot as plt
from scipy.spatial.transform import Rotation as R

# Carregar os dados do arquivo .npz
loaded_data = np.load('displacements_data.npz', allow_pickle=True)
list_displacements = loaded_data['displacements']
list_quaternions = loaded_data['quaternions']

# Configurar o gráfico 3D
fig = plt.figure()
ax = fig.add_subplot(projection='3d')

# Listas para armazenar as posições e direções
xs, ys, zs = [], [], []
dirs_x, dirs_y, dirs_z = [], [], []

# Posição inicial (0, 0, 0)
x = y = z = 0

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
    # Converter o quaternion para a matriz de rotação
    imu_to_world = R.from_quat(quaternion_normalized).as_matrix()

    # Definir a transformação da câmera para o IMU
    cam_to_imu = np.array(
        [[1, 0, 0],
         [0, 0, 1],
         [0, 1, 0]]
    )

    # Calcular as direções dos vetores de rotação
    dir_x = imu_to_world @ cam_to_imu @ np.array([1, 0, 0])
    dir_y = imu_to_world @ cam_to_imu @ np.array([0, 1, 0])
    dir_z = imu_to_world @ cam_to_imu @ np.array([0, 0, 1])

    dirs_x.append(dir_x)
    dirs_y.append(dir_y)
    dirs_z.append(dir_z)

    # Atualizar a posição acumulada
    x += dir_x[0] * dx + dir_y[0] * dy
    y += dir_x[1] * dx + dir_y[1] * dy
    z += dir_x[2] * dx + dir_y[2] * dy
    xs.append(x)
    ys.append(y)
    zs.append(z)

# Converter direções para arrays NumPy
dirs_x = np.array(dirs_x)
dirs_y = np.array(dirs_y)
dirs_z = np.array(dirs_z)

# Define o intervalo de amostragem para os vetores
b = 10

# Plotar os vetores de direção
ax.quiver(xs[::b], ys[::b], zs[::b], dirs_x[::b, 0], dirs_x[::b, 1], dirs_x[::b, 2], length=100, normalize=True,
          color='r', label='X direction')
ax.quiver(xs[::b], ys[::b], zs[::b], dirs_y[::b, 0], dirs_y[::b, 1], dirs_y[::b, 2], length=100, normalize=True,
          color='g', label='Y direction')
ax.quiver(xs[::b], ys[::b], zs[::b], dirs_z[::b, 0], dirs_z[::b, 1], dirs_z[::b, 2], length=100, normalize=True,
          color='b', label='Z direction')

# Plotar a trajetória
ax.plot(xs[::b], ys[::b], zs[::b], color='b', alpha=0.5, label='Trajectory')

# Ajustar os limites do gráfico
ax.set_xlim([-1500, 1500])
ax.set_ylim([-1500, 1500])
ax.set_zlim([-1500, 1500])

# Adicionar legendas e título
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_title('3D Trajectory with Orientation Vectors')

# Mostrar o gráfico
plt.legend()
plt.show()
