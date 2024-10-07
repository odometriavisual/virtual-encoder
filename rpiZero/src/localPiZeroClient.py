import threading
import time
import requests
from picamera2 import Picamera2
from picamera2.encoders import JpegEncoder
from picamera2.outputs import FileOutput
from libcamera import controls
import adafruit_bno055
import cv2
import board
import warnings

class LocalPiZeroClient:
    def __init__(self):
        # Inicializa a câmera
        self.picam2 = Picamera2()

        self.picam2.configure(self.picam2.create_preview_configuration({'format': 'RGB888',"size": (640, 480)}))

        self.picam2.controls.FrameRate = 60  # Ajusta o FPS
        self.picam2.start()

        self.vid_lock = threading.Lock()
        self.frame = None
        self.frame_available = threading.Event()

        self.focus = None

        self.imu_enabled = False
        i2c = board.I2C()
        try:
            self.imu = adafruit_bno055.BNO055_I2C(i2c, 0x29)
            self.imu_enabled = True
        except:
            warnings.warn("Não foi possível iniciar o bno055, ele será desabilitado")

        def update():
            update_period = 1_000_000_000 / 60
            time_now = time.monotonic_ns()
            next_update = time_now

            while True:
                time.sleep(0.001)
                time_now = time.monotonic_ns()
                if time_now > next_update:
                    next_update += update_period

                    # Captura um frame da camera
                    frame = self.picam2.capture_array()
                    self.frame_available.set()

                    with self.vid_lock:
                        self.frame = frame

                    # Salva a imagem no diretório especificado
                    imgs_directory = '/home/pi/picam_imgs'
                    filename = f'{imgs_directory}/{time.time_ns()}.jpg'
                    self.picam2.capture_file(filename)

        self.vid_thread = threading.Thread(daemon=True, target=update)
        self.vid_thread.start()

    def set_focus(self, focus: float):
        # Ajusta o foco da câmera
        self.focus = focus
        self.picam2.set_controls({"AfMode": controls.AfModeEnum.Manual, "LensPosition": float(focus)})

    def set_exposure(self, exposure: int):
        # Ajusta a exposição da câmera
        self.picam2.set_controls({"ExposureTime": exposure})

    def get_orientation(self) -> [float, float, float, float, float, float]:
        if self.imu_enabled is True:
            return self.imu.quaternion
        else:
            return [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]

    def get_img(self):
        # Retorna o frame mais recente capturado
        with self.vid_lock:
            frame = self.frame.copy()
        return frame

    def get_status(self):
        status = {
            'imu': self.imu_enabled,
            'camera': len(Picamera2.global_camera_info()) > 0,
        }

        return status


    def download_all_images(self):
        raise NotImplementedError

    def delete_all_images(self):
        raise NotImplementedError

