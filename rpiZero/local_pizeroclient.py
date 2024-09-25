import threading
import time
import requests
from picamera2 import Picamera2
from picamera2.encoders import JpegEncoder
from picamera2.outputs import FileOutput
from libcamera import controls


class local_PiZeroClient:
    def __init__(self):
        # Inicializa a câmera
        self.picam2 = Picamera2()
        self.picam2.configure(self.picam2.create_video_configuration(main={"size": (640, 480)}))
        self.picam2.controls.FrameRate = 60  # Ajusta o FPS
        self.picam2.start()

        self.vid_lock = threading.Lock()
        self.frame = None

        def update():
            while True:
                time.sleep(0.001)
                with self.vid_lock:
                    # Captura um frame da câmera
                    self.frame = self.picam2.capture_array()

                    # Salva a imagem no diretório especificado
                    imgs_directory = '/home/pi/picam_imgs'
                    filename = f'{imgs_directory}/{time.time_ns()}.jpg'
                    self.picam2.capture_file(filename)

        self.vid_thread = threading.Thread(daemon=True, target=update)
        self.vid_thread.start()

    def set_focus(self, focus: int):
        # Ajusta o foco da câmera
        self.picam2.set_controls({"AfMode": controls.AfModeEnum.Manual, "LensPosition": float(focus)})

    def set_exposure(self, exposure: int):
        # Ajusta a exposição da câmera
        self.picam2.set_controls({"ExposureTime": exposure})

    def get_orientation(self) -> [float, float, float, float]:
        # Simulando a orientação do sensor IMU
        # A implementação real vai depender do sensor IMU conectado ao Pi Zero
        return [0.0, 0.0, 0.0, 0.0]

    def get_img(self):
        # Retorna o frame mais recente capturado
        with self.vid_lock:
            return self.frame

    def download_all_images(self):
        raise NotImplementedError

    def delete_all_images(self):
        raise NotImplementedError


client = local_PiZeroClient()
while True:
    time.sleep(1)
    print(client.get_img())