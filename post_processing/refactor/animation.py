import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
from scipy.spatial.transform import Rotation as R
from matplotlib.widgets import Slider, Button
from imu_tools import fast_rot

txt_file = "last_npz_directory.txt"

try:
    with open(txt_file, "r") as f:
        numpy_folder = f.read().strip()  # Read path and remove extra spaces
except FileNotFoundError:
    print(f"File {txt_file} not found. Make sure the file has been saved previously.")
    numpy_folder = None

# Load data from NPZ file if directory is valid
if numpy_folder:
    loaded_data = np.load(numpy_folder, allow_pickle=True)
    print(f"NPZ file loaded from: {numpy_folder}")
else:
    print("Could not load NPZ file due to path error.")

list_displacements_2d = loaded_data['displacements']
list_quaternions = loaded_data['quaternions']


def calculate_displacements(positions):
    displacements = np.diff(positions, axis=0)  # Difference between consecutive positions
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
    return rotated_vector[1:]  # Return rotated vector


# Function to create a unit cube centered at origin
def create_cube(size):
    return np.array([[-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5],
                     [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5]]) * size


# Function to rotate and translate the cube
def transform_cube(cube, quaternion, position):
    r = R.from_quat(quaternion, scalar_first=True)
    rotated_cube = r.apply(cube)  # Apply rotation
    return rotated_cube + position  # Apply translation


def calculate_trajectory(rotation_base_1, rotation_base_2, method, dx_dy_multiplyer):
    trajectory = []
    quiver_unitary_list_x = []
    quiver_unitary_list_y = []
    position = np.array([0.0, 0.0, 0.0])
    last_quat = None

    print(rotation_base_1)
    print(rotation_base_2)
    print("")

    # Iterate over displacements and quaternions
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
            rotation_base_dy = np.array(rotation_base_2) * dy
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

        # Accumulate displacement
        position += displacement_3d

        # Store accumulated position
        trajectory.append(position.copy())

    trajectory = np.array(trajectory)
    return trajectory, quiver_unitary_list_x, quiver_unitary_list_y


# Prepare data
order = [1, 3]

# primeiro é o vermelho
# segundo é o azul

# 1 roxo/rosa
# 2 amarelo/azul
# 3 preto/vermelho

# 1 Vermelho
# 2
# 1 é azul
# 2 é vermelho
# 3 é amarelo


rotation_base_1 = [0, 0, 0, 0]
rotation_base_1[order[0]] = 1
rotation_base_2 = [0, 0, 0, 0]
rotation_base_2[order[1]] = 1

print(rotation_base_1)
print(rotation_base_2)

list_displacements_3d, quiver_unitary_list_x, quiver_unitary_list_y = calculate_trajectory(
    rotation_base_1,
    rotation_base_2,
    method="scipy_unitary",
    dx_dy_multiplyer=[1, 1]
)

displacements = calculate_displacements(list_displacements_3d)

# Set up figure with adjusted layout
fig = plt.figure(figsize=(14, 10))
plt.subplots_adjust(bottom=0.25)  # Make room for slider and buttons

# Subplot 1 (trajectory + cube with rotation)
ax1 = fig.add_subplot(121, projection='3d')
ax1.set_title("Trajectory and Rotated Cube")

# Subplot 2 (cube with rotation only)
ax2 = fig.add_subplot(122, projection='3d')
ax2.set_title("Rotation Visualization")

# Initialize cubes and trajectory
face_colors = ['red', 'black', 'blue', 'yellow', 'pink', 'purple']
cube_vertices = create_cube(size=50)

trajectory, = ax1.plot([], [], [], 'b-', label="Trajectory", linewidth=2)
cube_poly = Poly3DCollection([], facecolors=face_colors, linewidths=1, edgecolors='k', alpha=0.7)
ax1.add_collection3d(cube_poly)

cube_poly_right = Poly3DCollection([], facecolors=face_colors, linewidths=1, edgecolors='k', alpha=0.9)
ax2.add_collection3d(cube_poly_right)

ax2.set_ylim(-50, 50)
ax2.set_xlim(-50, 50)
ax2.set_zlim(-50, 50)

# Store original view settings
original_view1 = {'elev': ax1.elev, 'azim': ax1.azim}
original_view2 = {'elev': ax2.elev, 'azim': ax2.azim}

# Add slider for frame control
ax_slider = plt.axes([0.2, 0.15, 0.6, 0.03])
frame_slider = Slider(
    ax=ax_slider,
    label='Frame',
    valmin=0,
    valmax=len(list_displacements_3d) - 1,
    valinit=0,
    valstep=1
)

# Add buttons for playback control
ax_play = plt.axes([0.3, 0.05, 0.1, 0.04])
play_button = Button(ax_play, 'Play')

ax_pause = plt.axes([0.41, 0.05, 0.1, 0.04])
pause_button = Button(ax_pause, 'Pause')

# Add buttons for resetting views
ax_reset1 = plt.axes([0.25, 0.1, 0.15, 0.04])
reset_button1 = Button(ax_reset1, 'Reset Left View')

ax_reset2 = plt.axes([0.6, 0.1, 0.15, 0.04])
reset_button2 = Button(ax_reset2, 'Reset Right View')

# Variables to track animation state
animation_running = False
ani = None
current_frame = 0

# Update function for animation
last_arrow = None
last_arrow_x = None
last_arrow_y = None

quiver_multiplyer = 3


def update(frame):
    global last_arrow, last_arrow_x, last_arrow_y, current_frame

    current_frame = frame

    # Update trajectory
    trajectory.set_data(list_displacements_3d[:frame + 1, 0], list_displacements_3d[:frame + 1, 1])
    trajectory.set_3d_properties(list_displacements_3d[:frame + 1, 2])

    # Transform the cube
    transformed_cube = transform_cube(cube_vertices, list_quaternions[frame], list_displacements_3d[frame])

    # Update cube polygons
    faces = [[transformed_cube[j] for j in [0, 1, 2, 3]],
             [transformed_cube[j] for j in [4, 5, 6, 7]],
             [transformed_cube[j] for j in [0, 1, 5, 4]],
             [transformed_cube[j] for j in [2, 3, 7, 6]],
             [transformed_cube[j] for j in [0, 3, 7, 4]],
             [transformed_cube[j] for j in [1, 2, 6, 5]]]

    cube_poly.set_verts(faces)

    # Update cube in second plot
    transformed_cube_right = transform_cube(cube_vertices, list_quaternions[frame], [0, 0, 0])  # No displacement
    faces_right = [[transformed_cube_right[j] for j in [0, 1, 2, 3]],
                   [transformed_cube_right[j] for j in [4, 5, 6, 7]],
                   [transformed_cube_right[j] for j in [0, 1, 5, 4]],
                   [transformed_cube_right[j] for j in [2, 3, 7, 6]],
                   [transformed_cube_right[j] for j in [0, 3, 7, 4]],
                   [transformed_cube_right[j] for j in [1, 2, 6, 5]]]

    cube_poly_right.set_verts(faces_right)

    # Sum displacement of the last 10 frames for the arrow
    num_frames = 5
    start_idx = max(0, frame - num_frames + 1)  # Ensure no negative index
    end_idx = frame + 1  # Fixed to avoid index out of bounds

    if end_idx <= len(displacements):
        displacement_sum = np.sum(displacements[start_idx:end_idx], axis=0) * quiver_multiplyer

        # Update arrow
        if last_arrow is not None:
            last_arrow.remove()
        last_arrow = ax2.quiver(0, 0, 0, displacement_sum[0], displacement_sum[1], displacement_sum[2],
                                color='black', linewidth=2, label="3D Displacement Sum")

        if True:
            if last_arrow_x is not None:
                last_arrow_x.remove()
                last_arrow_y.remove()

            if start_idx < len(quiver_unitary_list_x) and end_idx <= len(quiver_unitary_list_x):
                quiver_sum_x = np.sum(quiver_unitary_list_x[start_idx:end_idx], axis=0) * quiver_multiplyer
                quiver_sum_y = np.sum(quiver_unitary_list_y[start_idx:end_idx], axis=0) * quiver_multiplyer
                last_arrow_x = ax2.quiver(0, 0, 0, quiver_sum_x[0], quiver_sum_x[1], quiver_sum_x[2], color='red',
                                          linewidth=2)
                last_arrow_y = ax2.quiver(0, 0, 0, quiver_sum_y[0], quiver_sum_y[1], quiver_sum_y[2], color='blue',
                                          linewidth=2)

    # Adjust limits so all axes have the same scale
    ax1.set_xlim(list_displacements_3d[frame][0] - 500, list_displacements_3d[frame][0] + 500)
    ax1.set_ylim(list_displacements_3d[frame][1] - 500, list_displacements_3d[frame][1] + 500)
    ax1.set_zlim(list_displacements_3d[frame][2] - 500, list_displacements_3d[frame][2] + 500)

    # Update slider value without triggering the callback
    frame_slider.eventson = False
    frame_slider.set_val(frame)
    frame_slider.eventson = True

    fig.canvas.draw_idle()

    return trajectory, cube_poly, cube_poly_right


# Button callback functions
def play_animation(event):
    global animation_running, ani, current_frame
    if not animation_running:
        if ani is not None:
            ani.event_source.stop()
        # Start animation from current frame
        ani = animation.FuncAnimation(
            fig, update, frames=range(current_frame, len(list_displacements_3d)),
            interval=50, blit=False, repeat=False
        )
        animation_running = True
        plt.draw()


def pause_animation(event):
    global animation_running, ani
    if animation_running and ani is not None:
        ani.event_source.stop()
        animation_running = False
        plt.draw()


def reset_view1(event):
    # Reset view for left plot
    ax1.view_init(elev=original_view1['elev'], azim=original_view1['azim'])
    fig.canvas.draw_idle()


def reset_view2(event):
    # Reset view for right plot
    ax2.view_init(elev=original_view2['elev'], azim=original_view2['azim'])
    fig.canvas.draw_idle()


def update_frame(val):
    global current_frame, animation_running, ani
    # Stop any running animation
    if animation_running and ani is not None:
        ani.event_source.stop()
        animation_running = False

    # Update to the selected frame
    current_frame = int(val)
    update(current_frame)
    fig.canvas.draw_idle()


# Connect callbacks to UI elements
frame_slider.on_changed(update_frame)
play_button.on_clicked(play_animation)
pause_button.on_clicked(pause_animation)
reset_button1.on_clicked(reset_view1)
reset_button2.on_clicked(reset_view2)

# Initialize the first frame
update(0)

# Show the plot
plt.show()