import sys
import os
import glob
import csv
import numpy as np
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel, QVBoxLayout, QWidget, QFileDialog, QProgressBar, QMessageBox
from PySide6.QtCore import Qt, QThread, Signal
import matplotlib
from visual_odometer.displacement_estimators.svd import svd_method
from visual_odometer.preprocessing import image_preprocessing
from PySide6.QtCore import QTimer

from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
import matplotlib.pyplot as plt
from concurrent.futures import ThreadPoolExecutor

from mpl_toolkits.mplot3d import Axes3D
from datetime import datetime
from post_processing.tools.gpu_tools import gpu_svd_method

matplotlib.use('Qt5Agg')

class ProcessingThread(QThread):
    progress_signal = Signal(str, int)  # Signals to update the progress label and bar
    finished_signal = Signal(np.ndarray, np.ndarray)  # Signal to send final 3D positions
    error_signal = Signal(str)  # Signal to show an error message

    def __init__(self, folder_path):
        super().__init__()
        self.folder_path = folder_path

    def run(self):
        # Carregar dados da IMU e imagens
        imu_file = os.path.join(self.folder_path, "imu.csv")
        image_files = sorted(glob.glob(os.path.join(self.folder_path, '*.jpg')))

        if not image_files or len(image_files) <= 0:
            self.error_signal.emit("ERRO: Não há nenhuma imagem na pasta selecionada.")
            return
        if not os.path.exists(imu_file):
            self.error_signal.emit("ERRO: Arquivo imu.csv não encontrado na pasta selecionada.")
            return

        # Indicar que estamos carregando as imagens
        self.progress_signal.emit("Carregando imagens...", 20)
        img_stream = [self.load_image(img_file) for img_file in image_files]

        # Indicar que estamos carregando os dados da IMU
        self.progress_signal.emit("Carregando dados da IMU...", 40)
        imu_data = self.load_imu_data(imu_file)

        # Processar imagens
        self.progress_signal.emit("Processando deslocamento...", 60)
        positions3D, positions2D, quaternions, timestamps = self.process_displacements(img_stream, imu_data, image_files)
        self.save_data_to_csv(positions3D, positions2D, quaternions, timestamps)

        self.progress_signal.emit("Processamento concluído!", 100)
        self.finished_signal.emit(positions3D, positions2D)
        #self.thread.error_signal.connect(self.show_error)  # Connect the error signal to a handler

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
                data = {
                    'timestamp': int(float(row['timestamp'])),
                    'qx': float(row['qx']) if row['qx'] else 0.0,
                    'qy': float(row['qy']) if row['qy'] else 0.0,
                    'qz': float(row['qz']) if row['qz'] else 0.0,
                    'qw': float(row['qw']) if row['qw'] else 0.0
                }
                imu_data.append(data)
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

            dx, dy = svd_method(img_preprocessed, old_processed_img, 640, 480)

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

    def save_data_to_csv(self, positions3D, positions2D, quaternions, timestamps):
        processed_data_path = os.path.join(self.folder_path, "processed_data.csv")

        # Define o cabeçalho do CSV
        header = [
            "positions3D_x", "positions3D_y", "positions3D_z",
            "positions2D_x", "positions2D_y",
            "quaternion_w", "quaternion_x", "quaternion_y", "quaternion_z",
            "timestamp"
        ]

        # Abra o arquivo CSV e escreva os dados
        with open(processed_data_path, mode='w', newline='') as file:
            writer = csv.writer(file)

            # Escreva o cabeçalho
            writer.writerow(header)

            # Escreva cada linha de dados
            for i in range(len(timestamps)):
                row = [
                    positions3D[i][0], positions3D[i][1], positions3D[i][2],
                    positions2D[i][0], positions2D[i][1],
                    quaternions[i][0], quaternions[i][1], quaternions[i][2], quaternions[i][3],
                    timestamps[i]
                ]
                writer.writerow(row)

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

        # Botão Play/Pause
        self.play_pause_button = QPushButton("Iniciar", self)
        self.play_pause_button.setEnabled(False)  # Desativado até o processamento ser concluído
        self.play_pause_button.clicked.connect(self.toggle_play_pause)
        self.layout.addWidget(self.play_pause_button)

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

        # Timer para atualizar o gráfico
        self.timer = QTimer()
        self.timer.timeout.connect(self.update_trajectory)

        # Controle de estado
        self.playing = False
        self.current_index = 0
        self.positions3D = None  # Inicialmente vazio

        # Variáveis para preservar a posição da câmera
        self.elev = None
        self.azim = None

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
        self.thread.finished_signal.connect(self.on_processing_finished)
        self.thread.error_signal.connect(self.show_error)
        self.thread.start()

    def update_progress(self, message, progress_value):
        self.progress_label.setText(message)
        self.progress_bar.setValue(progress_value)

    def on_processing_finished(self, positions3D_1, positions2D):
        self.positions3D = positions3D_1
        self.current_index = 0
        self.play_pause_button.setEnabled(True)  # Ativar botão Play/Pause
        self.progress_label.setText("Processamento concluído! Clique em 'Iniciar' para visualizar a trajetória.")

    def toggle_play_pause(self):
        if self.playing:
            self.timer.stop()
            self.playing = False
            self.play_pause_button.setText("Continuar")
        else:
            self.timer.start(100)  # Atualizar o gráfico a cada 100ms
            self.playing = True
            self.play_pause_button.setText("Pausar")

    def update_trajectory(self):
        if self.positions3D is not None:
            if self.current_index < len(self.positions3D):
                self.plot_partial_trajectory(self.positions3D[:self.current_index + 1])
                self.current_index += 1
            else:
                self.timer.stop()  # Parar o timer ao final da trajetória
                self.playing = False
                self.play_pause_button.setText("Iniciar")

    def plot_partial_trajectory(self, partial_positions3D):
        # Preservar a posição da câmera atual antes de limpar a figura
        if self.figure.axes:
            self.elev = self.figure.gca().elev
            self.azim = self.figure.gca().azim

        # Plotar a trajetória parcial em 3D
        self.figure.clear()
        ax = self.figure.add_subplot(111, projection='3d')

        # Restaurar a posição da câmera
        if self.elev is not None and self.azim is not None:
            ax.view_init(elev=self.elev, azim=self.azim)

        # Extrair coordenadas parciais
        x, y, z = zip(*partial_positions3D)

        # Plotar as trajetórias
        ax.plot(x, y, z, color='blue', marker='o', label='Trajetória Parcial')

        # Configurar limites e título
        max_value = max(max(x), max(y), max(z))
        min_value = min(min(x), min(y), min(z))
        ax.set_xlim(min_value, max_value)
        ax.set_ylim(min_value, max_value)
        ax.set_zlim(min_value, max_value)

        ax.set_title('Trajetória Parcial')
        ax.set_xlabel('X')
        ax.set_ylabel('Y')
        ax.set_zlabel('Z')

        # Atualizar o canvas
        self.canvas.draw()

    def show_error(self, message):
        error_dialog = QMessageBox()
        error_dialog.setWindowTitle("Erro")
        error_dialog.setText(message)
        error_dialog.setIcon(QMessageBox.Critical)
        error_dialog.exec()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = TrajectoryApp()
    window.show()
    sys.exit(app.exec())
