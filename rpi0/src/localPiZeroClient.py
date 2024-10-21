import threading
import time
from picamera2 import Picamera2
from libcamera import controls

class LocalPiZeroClient:
    def __init__(self, picam, imu):
        # Inicializa a câmera
        self.picam2 = picam

        self.vid_lock = threading.Lock()
        self.frame = None
        self.frame_available = threading.Event()

        self.focus = None

        self.boot_time = time.time_ns()

        self.last_status_time = 0
        self.rpi5status = ''

        self.imu_enabled = not imu is None
        self.imu = imu

        def update():
            while True:
                # Captura um frame da camera
                frame = self.picam2.capture_array()
                self.frame_available.set()

                with self.vid_lock:
                    self.frame = frame.copy()

        self.vid_thread = threading.Thread(daemon=True, target=update)
        self.vid_thread.start()

    def set_focus(self, focus: float):
        # Ajusta o foco da câmera
        self.focus = focus
        self.picam2.set_controls({"AfMode": controls.AfModeEnum.Manual, "LensPosition": float(focus)})

    def set_exposure(self, exposure: int):
        # Ajusta a exposição da câmera
        self.picam2.set_controls({"ExposureTime": exposure})

    def get_orientation(self) -> [int, float, float, float, float]:
        if self.imu_enabled is True:
            time_now = time.time_ns()
            quat = self.imu.quaternion
            return [time_now, quat[0], quat[1], quat[2], quat[3]]
        else:
            return [0, 0.0, 0.0, 0.0, 0.0]

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
        self.last_status_time = time.time_ns()
        self.rpi5status = status

    def download_all_images(self):
        raise NotImplementedError

    def delete_all_images(self):
        raise NotImplementedError

