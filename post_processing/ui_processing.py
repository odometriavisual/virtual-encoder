import sys
import os
import glob
import csv
import numpy as np
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel, QVBoxLayout, QWidget, QFileDialog, QProgressBar, QMessageBox
from PySide6.QtCore import Qt, QThread, Signal
from PySide6.QtGui import QPixmap,QImage
from PySide6.QtWidgets import QSlider, QHBoxLayout


import matplotlib
from visual_odometer.displacement_estimators.svd import svd_method
from visual_odometer.preprocessing import image_preprocessing
from visual_odometer.visual_odometer import DEFAULT_CONFIG
from PySide6.QtCore import QTimer

from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
import matplotlib.pyplot as plt

#from post_processing.tools.gpu_tools import gpu_svd_method
from PIL import Image, ImageOps, ImageEnhance
2
matplotlib.use('Qt5Agg')

class ProcessingThread(QThread):
    progress_signal = Signal(str, int)  # Signals to update the progress label and bar
    finished_signal = Signal(np.ndarray, np.ndarray)  # Signal to send final 3D positions
    error_signal = Signal(str)  # Signal to show an error message

    def __init__(self, folder_path):
        super().__init__()
        self.folder_path = folder_path
        self.image_files = []  # Inicializar o atributo
        self.quaternions = []  # Add this line to initialize the quaternions list

    def run(self):
        # Carregar dados da IMU e imagens
        imu_file = os.path.join(self.folder_path, "imu.csv")
        self.image_files = sorted(glob.glob(os.path.join(self.folder_path, '*.jpg')))  # Salvar aqui

        if not self.image_files or len(self.image_files) <= 0:
            self.error_signal.emit("ERRO: Não há nenhuma imagem na pasta selecionada.")
            return
        if not os.path.exists(imu_file):
            self.error_signal.emit("ERRO: Arquivo imu.csv não encontrado na pasta selecionada.")
            return

        # Indicar que estamos carregando as imagens
        self.progress_signal.emit("Carregando imagens...", 20)
        img_stream = [self.load_image(img_file) for img_file in self.image_files]

        # Indicar que estamos carregando os dados da IMU
        self.progress_signal.emit("Carregando dados da IMU...", 40)
        imu_data = self.load_imu_data(imu_file)

        # Processar imagens
        self.progress_signal.emit("Processando deslocamento...", 60)
        positions3D, positions2D, quaternions, timestamps = self.process_displacements(img_stream, imu_data, self.image_files)
        self.save_data_to_csv(positions3D, positions2D, quaternions, timestamps)

        self.progress_signal.emit("Processamento concluído!", 100)
        self.finished_signal.emit(positions3D, positions2D)
        #self.thread.error_signal.connect(self.show_error)  # Connect the error signal to a handler

    def load_image(self, filename):
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

        # Normalizar os valores de pixel para 0-1
        img_array = img_array / 255.0

        return image_preprocessing(img_array, DEFAULT_CONFIG)

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
        array_quaternions = []
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
            quaternions = [qx, qy, qz, qw]
            rotation_matrix = self.quaternion_to_rotation_matrix(quaternions)

            #print(quaternions)

            displacement_2d = np.array([0.0 , dy, dx])
            #displacement_2d = np.array([dy , 0.0, dx])

            displacement_3d = rotation_matrix @ displacement_2d
            #displacement_3d = displacement_2d

            current_position2D += displacement_2d
            current_position3D += displacement_3d
            array_quaternions.append(quaternions)
            timestamps.append(img_timestamp)

            positions2D.append(tuple(current_position2D))
            positions3D.append(tuple(current_position3D))

            old_processed_img = img_preprocessed
            self.progress_signal.emit(f"Processando imagem {idx + 1}...", 60 + int(40 * (idx + 1) / len(image_files)))

        return np.array(positions3D), np.array(positions2D), np.array(array_quaternions), np.array(timestamps)

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
        self.setGeometry(100, 100, 1600, 600)

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

        # Barra de Progresso (QSlider)
        self.progress_slider = QSlider(Qt.Horizontal, self)
        self.progress_slider.setMinimum(0)
        self.progress_slider.setValue(0)
        self.progress_slider.setEnabled(False)  # Desativada até o processamento ser concluído
        self.progress_slider.valueChanged.connect(self.on_slider_value_changed)
        self.layout.addWidget(self.progress_slider)

        # Label para progresso
        self.progress_label = QLabel("Progresso: Aguardando seleção da pasta", self)
        self.layout.addWidget(self.progress_label)

        # Barra de progresso
        self.progress_bar = QProgressBar(self)
        self.layout.addWidget(self.progress_bar)

        # Layout horizontal para o Matplotlib canvas e o QLabel de imagem
        side_by_side_layout = QHBoxLayout()

        # Matplotlib canvas para plotagem 3D
        self.figure = plt.figure()
        self.canvas = FigureCanvas(self.figure)
        side_by_side_layout.addWidget(self.canvas)

        # Adicionar QLabel para exibir a imagem
        self.image_label = QLabel("Imagem do deslocamento atual", self)
        self.image_label.setAlignment(Qt.AlignCenter)
        self.image_label.setFixedSize(700, 500)
        side_by_side_layout.addWidget(self.image_label)

        # Adicionar o layout lateral ao layout principal
        self.layout.addLayout(side_by_side_layout)

        # Controle de correção de gama
        gamma_layout = QHBoxLayout()

        # Texto à esquerda do slider
        self.gamma_label = QLabel("Ajuste de gamma:", self)
        gamma_layout.addWidget(self.gamma_label)

        # Slider de gama (horizontal)
        self.gamma_slider = QSlider(Qt.Horizontal, self)
        self.gamma_slider.setMinimum(1)
        self.gamma_slider.setMaximum(300)
        self.gamma_slider.setValue(100)  # Valor padrão (sem correção de gama)
        self.gamma_slider.valueChanged.connect(self.on_gamma_slider_changed)

        # Adicionando o slider ao layout
        gamma_layout.addWidget(self.gamma_slider)

        # Adicionando o layout ao layout principal
        self.layout.addLayout(gamma_layout)

        self.gamma_value = 1.0  # Gama inicial

        # Timer para atualizar o gráfico
        self.timer = QTimer()
        self.timer.timeout.connect(self.update_trajectory)

        # Controle de estado
        self.playing = False
        self.current_index = 0
        self.positions3D = None  # Inicialmente vazio
        self.image_files = None  # Lista de arquivos de imagem

        # Variáveis para preservar a posição da câmera
        self.elev = None
        self.azim = None

        # Definir layout
        container = QWidget()
        container.setLayout(self.layout)
        self.setCentralWidget(container)

    def on_gamma_slider_changed(self, value):
        self.gamma_value = value / 100.0
        self.update_image(self.image_files[self.current_index])

    def on_slider_value_changed(self):
        # Atualiza a posição atual com base no valor da barra de progresso
        if self.positions3D is not None:
            self.current_index = self.progress_slider.value()
            self.plot_partial_trajectory(self.positions3D[:self.current_index + 1])
            self.update_image(self.image_files[self.current_index])

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
        self.image_files = self.thread.image_files  # Agora está disponível
        self.play_pause_button.setEnabled(True)  # Ativar botão Play/Pause
        self.progress_slider.setEnabled(True)  # Ativar a barra de progresso
        self.progress_slider.setMaximum(len(self.positions3D) - 1)  # Ajustar o máximo baseado no número de pontos
        self.progress_label.setText("Processamento concluído! Clique em 'Iniciar' para visualizar a trajetória.")

    def toggle_play_pause(self):
        if self.playing:
            self.timer.stop()
            self.playing = False
            self.play_pause_button.setText("Iniciar")
        else:
            self.timer.start(100)  # Atualizar o gráfico a cada 100ms
            self.playing = True
            self.play_pause_button.setText("Pausar")

    def update_trajectory(self):
        if self.positions3D is not None:
            if self.current_index < len(self.positions3D):
                self.plot_partial_trajectory(self.positions3D[:self.current_index + 1])
                self.update_image(self.image_files[self.current_index])  # Atualizar a imagem exibida
                self.progress_slider.setValue(self.current_index)  # Atualizar a barra de progresso
                self.current_index += 1
            else:
                self.timer.stop()  # Parar o timer ao final da trajetória
                self.playing = False
                self.play_pause_button.setText("Iniciar")

    def quaternion_to_rotation_matrix(self, q):
        qx, qy, qz, qw = q
        return np.array([
            [1 - 2 * (qy ** 2 + qz ** 2), 2 * (qx * qy - qw * qz), 2 * (qx * qz + qw * qy)],
            [2 * (qx * qy + qw * qz), 1 - 2 * (qx ** 2 + qz ** 2), 2 * (qy * qz - qw * qx)],
            [2 * (qx * qz - qw * qy), 2 * (qy * qz + qw * qx), 1 - 2 * (qx ** 2 + qy ** 2)]
        ])

    def plot_partial_trajectory(self, partial_positions3D):
        # Preservar a posição da câmera atual antes de limpar a figura
        if self.figure.axes:
            self.elev = self.figure.gca().elev
            self.azim = self.figure.gca().azim

        # Plotar a trajetória parcial em 3D
        self.figure.clear()
        ax = self.figure.add_subplot(111, projection='3d')
        ax.view_init(elev=self.elev, azim=self.azim)  # Restaurar a posição da câmera

        # Extrair coordenadas parciais
        x, y, z = zip(*partial_positions3D)

        # Configurar cores e transparências para todos os pontos, exceto o último
        num_points = len(partial_positions3D)
        alpha_values = [i / num_points for i in range(num_points - 1)]
        color_values = [(i / num_points, 0, 1 - i / num_points, alpha_values[i]) for i in range(num_points - 1)]

        # Plotar todos os pontos anteriores de uma só vez
        ax.scatter(x[:-1], y[:-1], z[:-1], c=color_values, s=30, label='Trajetória')

        # Destacar o ponto atual
        ax.scatter(x[-1], y[-1], z[-1], color='red', s=100, label='Posição Atual')

        # Conectar os pontos com uma linha
        ax.plot(x, y, z, color='blue', label='Trajetória Parcial')

        # Configurar limites e título
        max_value = max(max(x), max(y), max(z))
        min_value = min(min(x), min(y), min(z))
        margin = 0.1
        if max_value == min_value:
            max_value += margin
            min_value -= margin

        ax.set_xlim(min_value, max_value)
        ax.set_ylim(min_value, max_value)
        ax.set_zlim(min_value, max_value)

        ax.set_title('Trajetória Parcial')
        ax.set_xlabel('X')
        ax.set_ylabel('Y')
        ax.set_zlabel('Z')

        # Atualizar o canvas
        self.canvas.draw()

    def update_image(self, image_file):
        img = Image.open(image_file)
        img = img.resize((400, 300), Image.Resampling.LANCZOS)  # Redimensionar a imagem
        img = ImageOps.exif_transpose(img)  # Manter a orientação correta

        # Aplicar correção de gamma
        img = self.apply_gamma(img)

        # Converter imagem para array NumPy
        img_array = np.array(img)

        # Criar QImage para exibir no QLabel
        qimage = QImage(img_array.data, img_array.shape[1], img_array.shape[0], QImage.Format_RGB888)
        pixmap = QPixmap.fromImage(qimage)
        self.image_label.setPixmap(pixmap)
        self.image_label.setAlignment(Qt.AlignCenter)  # Centralizar no QLabel

    def apply_gamma(self, img):
        """Aplica a correção de gamma na imagem"""
        # Converter a imagem para array NumPy
        img_array = np.array(img) / 255.0  # Normaliza os valores para o intervalo [0, 1]

        # Aplica a correção de gamma
        img_array = np.power(img_array, self.gamma_value)

        # Reverter a normalização (trazendo de volta para o intervalo [0, 255])
        img_array = np.uint8(img_array * 255)

        # Converter de volta para imagem PIL
        return Image.fromarray(img_array)

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
