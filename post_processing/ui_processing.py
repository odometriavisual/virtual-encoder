import sys
import os
import glob
import csv
import numpy as np
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel, QVBoxLayout, QWidget, QFileDialog, QProgressBar
from PySide6.QtCore import Qt, QThread, Signal
import matplotlib
from visual_odometer.displacement_estimators.svd import svd_method
from visual_odometer.preprocessing import image_preprocessing
import h5py

from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from datetime import datetime

matplotlib.use('Qt5Agg')


class ProcessingThread(QThread):
    progress_signal = Signal(str, int)  # Signals to update the progress label and bar
    finished_signal = Signal(np.ndarray, np.ndarray)  # Signal to send final 3D positions

    def __init__(self, folder_path):
        super().__init__()
        self.folder_path = folder_path

    def run(self):
        # Carregar dados da IMU e imagens
        imu_file = os.path.join(self.folder_path, "imu.csv")
        image_files = sorted(glob.glob(os.path.join(self.folder_path, '*.jpg')))

        # Indicar que estamos carregando as imagens
        self.progress_signal.emit("Carregando imagens...", 20)
        img_stream = [self.load_image(img_file) for img_file in image_files]

        # Indicar que estamos carregando os dados da IMU
        self.progress_signal.emit("Carregando dados da IMU...", 40)
        imu_data = self.load_imu_data(imu_file)

        # Processar imagens
        self.progress_signal.emit("Processando deslocamento...", 60)
        positions3D, positions2D, _, _ = self.process_displacements(img_stream, imu_data, image_files)

        self.progress_signal.emit("Processamento concluído!", 100)
        self.finished_signal.emit(positions3D, positions2D)

    def load_image(self, filename):
        from PIL import Image, ImageOps
        img_rgb = Image.open(filename)
        img_grayscale = ImageOps.grayscale(img_rgb)
        img_array = np.asarray(img_grayscale)
        return image_preprocessing(img_array)

    def load_imu_data(self, imu_file):
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

    def process_displacements(self, img_stream, imu_data, image_files):
        positions2D = [(0, 0, 0)]
        positions3D = [(0, 0, 0)]

        current_position2D = np.array([0.0, 0.0, 0.0])
        current_position3D = np.array([0.0, 0.0, 0.0])
        quaternions = []
        timestamps = []

        old_processed_img = img_stream.pop(0)

        for idx, (img_preprocessed, img_file) in enumerate(zip(img_stream, image_files)):
            # Simular processo
            img_timestamp = int(os.path.basename(img_file).split('.')[0])
            closest_imu_data = self.find_closest_imu_data(imu_data, img_timestamp)

            dx, dy = svd_method(img_preprocessed, old_processed_img, 640, 480, use_gpu=False)

            # Calculando matriz de rotação e posição
            qx = closest_imu_data['qx']
            qy = closest_imu_data['qy']
            qz = closest_imu_data['qz']
            qw = closest_imu_data['qw']
            rotation_matrix = self.quaternion_to_rotation_matrix([qx, qy, qz, qw])

            displacement_2d = np.array([dx, dy, 0.0])
            displacement_3d = rotation_matrix @ displacement_2d

            current_position2D += displacement_2d
            current_position3D += displacement_3d
            quaternions.append([qx, qy, qz, qw])
            timestamps.append(img_timestamp)

            positions2D.append(tuple(current_position2D))
            positions3D.append(tuple(current_position3D))

            old_processed_img = img_preprocessed
            self.progress_signal.emit(f"Processando imagem {idx + 1}...", 60 + int(40 * (idx + 1) / len(image_files)))

        return np.array(positions3D), np.array(positions2D), np.array(quaternions), np.array(timestamps)

    def quaternion_to_rotation_matrix(self, q):
        qx, qy, qz, qw = q
        return np.array([
            [1 - 2 * (qy ** 2 + qz ** 2), 2 * (qx * qy - qw * qz), 2 * (qx * qz + qw * qy)],
            [2 * (qx * qy + qw * qz), 1 - 2 * (qx ** 2 + qz ** 2), 2 * (qy * qz - qw * qx)],
            [2 * (qx * qz - qw * qy), 2 * (qy * qz + qw * qx), 1 - 2 * (qx ** 2 + qy ** 2)]
        ])

    def find_closest_imu_data(self, imu_data, img_timestamp):
        closest_data = min(imu_data, key=lambda x: abs(x['timestamp'] - img_timestamp))
        return closest_data


class TrajectoryApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Visualização de Trajetória 3D")
        self.setGeometry(100, 100, 800, 600)

        # Layout principal
        self.layout = QVBoxLayout()

        # Botão para selecionar a pasta
        self.select_button = QPushButton("Selecionar Pasta", self)
        self.select_button.clicked.connect(self.open_folder_dialog)
        self.layout.addWidget(self.select_button)

        # Label para progresso
        self.progress_label = QLabel("Progresso: Aguardando seleção da pasta", self)
        self.layout.addWidget(self.progress_label)

        # Barra de progresso
        self.progress_bar = QProgressBar(self)
        self.layout.addWidget(self.progress_bar)

        # Matplotlib canvas para plotagem 3D
        self.figure = plt.figure()
        self.canvas = FigureCanvas(self.figure)
        self.layout.addWidget(self.canvas)

        # Definir layout
        container = QWidget()
        container.setLayout(self.layout)
        self.setCentralWidget(container)

    def open_folder_dialog(self):
        folder = QFileDialog.getExistingDirectory(self, "Selecione a pasta")
        if folder:
            self.start_processing(folder)

    def start_processing(self, folder):
        self.progress_label.setText("Iniciando processamento...")
        self.progress_bar.setValue(0)

        # Iniciar o thread de processamento
        self.thread = ProcessingThread(folder)
        self.thread.progress_signal.connect(self.update_progress)
        self.thread.finished_signal.connect(self.plot_trajectory)
        self.thread.start()

    def update_progress(self, message, progress_value):
        self.progress_label.setText(message)
        self.progress_bar.setValue(progress_value)

    def plot_trajectory(self, positions3D, positions2D):
        # Plotar a trajetória em 3D no canvas
        self.figure.clear()
        ax = self.figure.add_subplot(111, projection='3d')
        ax.plot(positions3D[:, 0], positions3D[:, 1], positions3D[:, 2], marker='o')
        ax.set_title('Trajetória de Deslocamento 3D')
        ax.set_xlabel('Deslocamento em X')
        ax.set_ylabel('Deslocamento em Y')
        ax.set_zlabel('Deslocamento em Z')
        self.canvas.draw()


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = TrajectoryApp()
    window.show()
    sys.exit(app.exec())
