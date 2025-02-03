import sys
import os
import glob
import csv
import numpy as np
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel, QVBoxLayout, QWidget, QFileDialog, QProgressBar, QMessageBox, QCheckBox, QSizePolicy
from PySide6.QtCore import Qt, QThread, Signal
from PySide6.QtGui import QPixmap,QImage
from PySide6.QtWidgets import QSlider, QHBoxLayout


import matplotlib
from visual_odometer.displacement_estimators.svd import svd_method
from visual_odometer.preprocessing import image_preprocessing
#from visual_odometer.visual_odometer import DEFAULT_CONFIG
from PySide6.QtCore import QTimer

from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection



#from post_processing.tools.gpu_tools import gpu_svd_method
from PIL import Image, ImageOps, ImageEnhance

matplotlib.use('Qt5Agg')

DEFAULT_CONFIG = {
    "Displacement Estimation": {
        "method": "svd",
        "params": {}
    },
    "Frequency Window": {
        "method": "Stone et al 2007",
        "params": {}
    },
    "Spatial Window": {
        "method": "blackman_harris",
        "params": {
            "a0": 0.358,
            "a1": 0.47,
            "a2": 0.135,
            "a3": 0.037,
        }
    },
    "Downsampling": {
        "method": "",
        "params": {
            "factor": 1,
        }
    },
}

class ProcessingThread(QThread):
    progress_signal = Signal(str, int)  # Signals to update the progress label and bar
    finished_signal = Signal(np.ndarray, np.ndarray, np.ndarray, np.ndarray)  # Signal to send final 3D positions
    error_signal = Signal(str)  # Signal to show an error message

    def __init__(self, folder_path):
        super().__init__()
        self.folder_path = folder_path
        self.image_files = []  # Inicializar o atributo
        self.quaternions = []  # Add this line to initialize the quaternions list
        self.R_correction = None

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
        positions3D, positions3DR, positions2D, quaternions, timestamps = self.process_displacements(img_stream, imu_data, self.image_files)
        self.save_data_to_csv(positions3D, positions2D, quaternions, timestamps)

        self.progress_signal.emit("Processamento concluído!", 100)
        self.finished_signal.emit(positions3D, positions3DR, positions2D, quaternions)
        #self.thread.error_signal.connect(self.show_error)  # Connect the error signal to a handler

    def load_image(self, filename):
        # Abrir imagem em RGB
        img_rgb = Image.open(filename)

        # Melhorar o brilho e o contraste
        #enhancer_brightness = ImageEnhance.Brightness(img_rgb)
        #img_rgb = enhancer_brightness.enhance(1.5)  # Ajuste o valor para mais brilho (1.0 é padrão)

        #enhancer_contrast = ImageEnhance.Contrast(img_rgb)
        #img_rgb = enhancer_contrast.enhance(1.5)  # Ajuste o valor para mais contraste

        # Converter para escala de cinza
        img_grayscale = ImageOps.grayscale(img_rgb)

        # Converter para matriz NumPy
        img_array = np.asarray(img_grayscale)

        # Normalizar os valores de pixel para 0-1
        # img_array = img_array / 255.0

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
        positions3DR = [(0, 0, 0)]

        current_position2D = np.array([0.0, 0.0, 0.0])
        current_position3D = np.array([0.0, 0.0, 0.0])
        current_position3DR = np.array([0.0, 0.0, 0.0])

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

            inverse_quaternion = [-quaternions[0], -quaternions[1], -quaternions[2], quaternions[3]]


            if self.R_correction is None:
                # Converte o quaternion inverso em uma matriz de rotação
                self.R_correction = self.quaternion_to_rotation_matrix(inverse_quaternion)

            # Converte o quaternion original em uma matriz de rotação
            rotation_matrix = self.quaternion_to_rotation_matrix(quaternions) @ self.R_correction

            #print(quaternions)

            displacement_2d = np.array([0 , dy, dx])
            #displacement_2d = np.array([dy , 0.0, dx])


            displacement_3d =  rotation_matrix @ np.array([dx, dy,0])
            displacement_3dr = rotation_matrix @ np.array([dy ,dx,0])

            #displacement_3dr = rotation_matrix @ np.array([0, dx, dy])


            current_position2D += displacement_2d
            current_position3D += displacement_3d
            current_position3DR += displacement_3dr

            array_quaternions.append(quaternions)
            timestamps.append(img_timestamp)

            positions2D.append(tuple(current_position2D))
            positions3D.append(tuple(current_position3D))
            positions3DR.append(tuple(current_position3DR))

            old_processed_img = img_preprocessed
            self.progress_signal.emit(f"Processando imagem {idx + 1}...", 60 + int(40 * (idx + 1) / len(image_files)))

        return np.array(positions3D), np.array(positions3DR), np.array(positions2D), np.array(array_quaternions), np.array(timestamps)

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

    def inverse_quaternion(self, q):
        """Retorna o inverso do quaternion (qx, qy, qz, qw)"""
        qx, qy, qz, qw = q
        return (-qx, -qy, -qz, qw)

    def find_closest_imu_data(self, imu_data, img_timestamp):
        closest_data = min(imu_data, key=lambda x: abs(x['timestamp'] - img_timestamp))
        return closest_data


class PlaneVisualizationWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Visualização do Avião")
        self.setGeometry(300, 300, 800, 600)

        # Layout principal
        self.main_layout = QVBoxLayout()

        # Matplotlib canvas
        self.figure = plt.figure()
        self.ax = self.figure.add_subplot(111, projection='3d')
        self.canvas = FigureCanvas(self.figure)
        self.main_layout.addWidget(self.canvas)

        # Inicializar posição e rotação do avião
        self.plane_position = np.array([0, 0, 0])
        self.rotation_matrix = np.eye(3)

        # Criar o modelo do avião
        self._draw_plane(self.plane_position, self.rotation_matrix)

        # Atualizar layout
        container = QWidget()
        container.setLayout(self.main_layout)
        self.setCentralWidget(container)

    def _draw_plane(self, position, rotation):
        """
        Desenha um avião simples em 3D.

        :param position: Array [x, y, z]
        :param rotation: Matriz de rotação 3x3
        """
        self.ax.clear()

        # Modelo básico do avião
        body = np.array([[0, 0, 0], [1, 0, 0], [0.5, -0.2, 0], [0.5, 0.2, 0]])  # Corpo do avião
        wings = np.array([[0.5, -0.5, 0], [0.5, 0.5, 0], [0.5, 0, -0.2]])  # Asa
        tail = np.array([[0, 0, 0.5], [0.2, 0, 0.2], [-0.2, 0, 0.2]])  # Cauda

        # Rotacionar e transladar cada parte
        body = (rotation @ body.T).T + position
        wings = (rotation @ wings.T).T + position
        tail = (rotation @ tail.T).T + position

        # Desenhar as partes
        self.ax.add_collection3d(Poly3DCollection([body], color="blue", alpha=0.8))
        self.ax.add_collection3d(Poly3DCollection([wings], color="red", alpha=0.6))
        self.ax.add_collection3d(Poly3DCollection([tail], color="green", alpha=0.6))

        # Ajustar limites ao redor da posição do avião
        margin = 0.5  # Reduzir a margem para aproximar a visão
        self.ax.set_xlim([position[0] - margin, position[0] + margin])
        self.ax.set_ylim([position[1] - margin, position[1] + margin])
        self.ax.set_zlim([position[2] - margin, position[2] + margin])
        self.ax.set_xlabel("X")
        self.ax.set_ylabel("Y")
        self.ax.set_zlabel("Z")

        self.canvas.draw()

    def update_plane_position(self, position, rotation):
        """
        Atualiza a posição e rotação do avião.

        :param position: Lista ou array com [x, y, z]
        :param rotation: Matriz de rotação 3x3
        """
        self.plane_position = np.array(position)
        self.rotation_matrix = np.array(rotation)
        self._draw_plane(self.plane_position, self.rotation_matrix)

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

        # Layout horizontal para agrupar as checkboxes
        checkbox_layout = QHBoxLayout()

        # Configurar margens e espaçamento
        checkbox_layout.setContentsMargins(0, 0, 0, 0)
        checkbox_layout.setSpacing(1)  # Espaço entre as checkboxes

        # Checkbox para alternar visualização 2D
        self.checkbox_2d = QCheckBox("Mostrar deslocamento 2D")
        #self.checkbox_2d.setSizePolicy(QSizePolicy.Fixed, QSizePolicy.Fixed)
        checkbox_layout.addWidget(self.checkbox_2d)

        # Checkbox para alternar visualização 3D
        self.checkbox_3d = QCheckBox("Mostrar deslocamento 3D")
        #self.checkbox_3d.setSizePolicy(QSizePolicy.Fixed, QSizePolicy.Fixed)
        checkbox_layout.addWidget(self.checkbox_3d)

        self.checkbox_3dr = QCheckBox("Mostrar deslocamento 3D")
        checkbox_layout.addWidget(self.checkbox_3dr)

        # Adicionar o layout de checkboxes ao layout principal
        self.layout.addLayout(checkbox_layout)

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
        self.positions3DR = None
        self.positions2D = None
        self.image_files = None  # Lista de arquivos de imagem
        self.quaterion_values = None

        # Variáveis para preservar a posição da câmera
        self.elev = None
        self.azim = None

        # Definir layout
        container = QWidget()
        container.setLayout(self.layout)
        self.setCentralWidget(container)

        # Adicionar botão para abrir a janela do avião
        self.show_plane_button = QPushButton("Visualizar Avião", self)
        self.show_plane_button.clicked.connect(self.open_plane_window)
        self.layout.addWidget(self.show_plane_button)

        # Instância da janela do avião
        self.plane_window = PlaneVisualizationWindow()

    def open_plane_window(self):
        self.plane_window.show()

    def update_plane_position(self, position, rotation=None):
        """
        Sincronizar o avião com as posições calculadas.
        """
        self.plane_window.update_plane_position(position, rotation)

    def on_gamma_slider_changed(self, value):
        self.gamma_value = value / 100.0
        self.update_image(self.image_files[self.current_index])

    def on_slider_value_changed(self):
        # Atualiza a posição atual com base no valor da barra de progresso
        if self.positions3D is not None:
            self.current_index = self.progress_slider.value()
            self.update_trajectory()
           # self.plot_partial_trajectory(self.positions3D[:self.current_index + 1], self.positions3DR[:self.current_index + 1], self.positions2D[:self.current_index + 1])
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

    def on_processing_finished(self, positions3D, positions3DR, positions2D, quaternions):
        self.positions3D = positions3D
        self.positions3DR = positions3DR
        self.positions2D = positions2D
        self.quaterion_values = quaternions
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
                self.plot_partial_trajectory(self.positions3D[:self.current_index + 1], self.positions3DR[:self.current_index + 1],self.positions2D[:self.current_index + 1])
                self.update_image(self.image_files[self.current_index])  # Atualizar a imagem exibida
                self.progress_slider.setValue(self.current_index)  # Atualizar a barra de progresso
                rotation_matrix = self.quaternion_to_rotation_matrix(self.quaterion_values[self.current_index])
                self.update_plane_position(self.positions3D[self.current_index], rotation_matrix)
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

    def plot_partial_trajectory(self, partial_positions3D, partial_positions3DR, partial_positions2D):
        """Plota a trajetória parcial em 3D e, opcionalmente, sua projeção 2D."""


        # Preservar a posição da câmera atual antes de limpar a figura
        if self.figure.axes:
            self.elev = self.figure.gca().elev
            self.azim = self.figure.gca().azim

        # Plotar a trajetória parcial em 3D
        self.figure.clear()
        ax = self.figure.add_subplot(111, projection='3d')
        ax.view_init(elev=self.elev, azim=self.azim)  # Restaurar a posição da câmera

        # Extrair coordenadas 3D parciais
        x, y, z = zip(*partial_positions3D)


        if self.checkbox_3d.isChecked():
            # Configurar cores e transparências para todos os pontos, exceto o último
            num_points = len(partial_positions3D)
            alpha_values = [i / num_points for i in range(num_points - 1)]
            color_values = [(i / num_points, 0, 1 - i / num_points, alpha_values[i]) for i in range(num_points - 1)]

            # Plotar todos os pontos anteriores de uma só vez
            ax.scatter(x[:-1], y[:-1], z[:-1], c=color_values, s=30, label='Trajetória 3D')

            # Destacar o ponto atual
            ax.scatter(x[-1], y[-1], z[-1], color='red', s=100, label='Posição Atual')

            # Conectar os pontos com uma linha
            ax.plot(x, y, z, color='blue', label='Trajetória Parcial')

        if self.checkbox_3dr.isChecked():
            xr, yr, zr = zip(*partial_positions3DR)

            # Configurar cores e transparências para todos os pontos, exceto o último
            num_points = len(partial_positions3DR)
            alpha_values = [i / num_points for i in range(num_points - 1)]
            color_values = [(i / num_points, 0, 1 - i / num_points, alpha_values[i]) for i in range(num_points - 1)]

            # Plotar todos os pontos anteriores de uma só vez
            ax.scatter(xr[:-1], yr[:-1], zr[:-1], c=color_values, s=30, label='Trajetória 3D')

            # Destacar o ponto atual
            ax.scatter(xr[-1], yr[-1], zr[-1], color='red', s=100, label='Posição Atual')

            # Conectar os pontos com uma linha
            ax.plot(xr, yr, zr, color='blue', label='Trajetória Parcial')

        # Plotar projeção 2D no plano XY, se fornecida
        x2d, y2d, z2d = zip(*partial_positions2D)
        if self.checkbox_2d.isChecked():
            ax.plot(x2d, y2d, z2d, color='green', linestyle='dashed', label='Projeção 2D')

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
        ax.legend()

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
