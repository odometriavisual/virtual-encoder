import threading
import time
from picamera2 import Picamera2
from libcamera import controls
from cv2 import imwrite

class LocalPiZeroClient:
    def __init__(self, picam, imu):
        # Inicializa a câmera
        self.picam2 = picam

        self.vid_lock = threading.Lock()
        self.frame = None
        self.frame_available = threading.Event()

        self.focus = None

        self.boot_time = time.monotonic_ns()

        self.enable_save_period = 15 * 1_000_000_000
        self.enable_save = False
        self.last_status_time = 0

        self.imu_enabled = not imu is None
        self.imu = imu

        def update():
            while True:
                time_now = time.monotonic_ns()

                # Captura um frame da camera
                frame = self.picam2.capture_array()
                self.frame_available.set()

                with self.vid_lock:
                    self.frame = frame.copy()

                if time_now > self.last_status_time + self.enable_save_img_period or self.enable_save_img:
                    imgs_directory = '/home/pi/picam_imgs'
                    filename = f'{imgs_directory}/{time.time_ns()}.jpg'
                    imwrite(filename, frame)

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
            time_now = time.monotonic_ns()
            quat = self.imu.quaternion
            return [self.boot_time, time_now, quat[0], quat[1], quat[2], quat[3]]
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

    def process_status(self, status):
        self.last_status_time = time.monotonic_ns()
        self.enable_save_img = status == "Disparo"

    def download_all_images(self):
        raise NotImplementedError

    def delete_all_images(self):
        raise NotImplementedError

