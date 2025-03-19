import json
import os
import socket
import subprocess
import threading
import time
from libcamera import controls
from picamera2 import Picamera2
from picamera2.encoders import MJPEGEncoder
from picamera2.outputs import FileOutput

from .log import Logger

class LocalPiZeroClient:
    def __init__(self, picam: Picamera2, imu, logger: Logger):
        # Inicializa a câmera
        self.picam2 = picam

        self.status_message_lock = threading.Lock()
        self.status_message = ''
        self.last_status_time = 0
        self.rpi5status = ''

        self.vid_lock = threading.Lock()
        self.frame = None
        self.frame_available = threading.Event()

        self.focus = 0
        self.exposure = 0
        self.default_exposure = 750
        self.calibration_progress = 0
        self.reset_exposure()
        self.set_focus(20)

        self.boot_time = time.time_ns()

        self.imu_enabled = not imu is None
        self.imu = imu

        self.streaming_enabled = True

        self.logger = logger

        def update():
            while True:
                # Captura um frame da camera
                frame = self.picam2.capture_array()
                self.frame_available.set()

                with self.vid_lock:
                    self.frame = frame.copy()

        self.vid_thread = threading.Thread(daemon=True, target=update)
        self.vid_thread.start()

    def send_debug_message(self, msg):
        with self.status_message_lock:
            self.status_message += msg + '\n'

    def set_focus(self, focus: float):
        # Ajusta o foco da câmera
        self.focus = focus
        if self.picam2.camera_properties['Model'] == 'imx708':
            self.picam2.set_controls({"AfMode": controls.AfModeEnum.Manual, "LensPosition": float(focus)})

    def set_exposure(self, exposure: int):
        # Ajusta a exposição da câmera
        self.exposure = exposure
        self.picam2.set_controls({"ExposureTime": exposure})
        self.send_debug_message(f'Set Exposição: {self.exposure}us')

    def reset_exposure(self):
        self.set_exposure(self.default_exposure)

    def get_orientation(self) -> [int, float, float, float, float]:
        if self.imu_enabled is True:
            time_now = time.time_ns()
            quat = self.imu.quaternion

            if any(q is None for q in quat):
                return None

            return [time_now, quat[0], quat[1], quat[2], quat[3]]
        else:
            return None

    def get_img(self):
        # Retorna o frame mais recente capturado
        with self.vid_lock:
            frame = self.frame.copy()
        return frame

    def get_status(self):
        with open('/sys/class/thermal/thermal_zone0/temp', 'r') as file:
            temp = file.read()
            temp = int(temp) / 1000

        with self.status_message_lock:
            status = {
                'imu': self.imu_enabled,
                'camera': len(Picamera2.global_camera_info()) > 0,
                'rpi0': { 'temp': temp, 'progress': self.calibration_progress },
                'msg': self.status_message
            }

            self.status_message = ''

        return status

    def process_status(self, status):
        self.last_status_time = time.time_ns()
        self.rpi5status = status

        if self.logger.enable_save and self.logger.ensaio_reason == 'timeout':
            self.logger.stop_acquisition()

    def get_file_count(self) -> int:
        """
        Returns number of ensaios in picam_imgs directory tree
        """
        zips = [file for file in os.listdir('/home/pi/picam_imgs') if file.find('.zip') > 0]
        return len(zips)

    def start_acquisition(self, timestamp, reason):
        self.logger.start_acquisition(timestamp, reason)

    def stop_acquititions(self):
        self.logger.stop_acquisition()

    def poweroff(self):
        subprocess.run(['sudo', 'poweroff'])

    def reboot(self):
        subprocess.run(['sudo', 'reboot'])

    def start_imu_stream(self):
        def _start():
            next_time = time.monotonic_ns()
            T = 1e9 / 100
            while True:
                t0 = time.monotonic_ns()
                if t0 < next_time:
                    time.sleep(0.001)
                    continue

                next_time += T

                if self.streaming_enabled:
                    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
                        sock.connect(("rpi5", 7101))
                        measure = self.get_orientation()
                        if measure is not None:
                            self.logger.orientations_queue.put(measure, block=False)
                            sock.send(json.dumps(measure).encode('utf-8'))

        threading.Thread(target=_start, daemon=True).start()

    def start_camera_stream(self):
        def _listen():
            encoder = MJPEGEncoder(2_000_000)

            with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
                sock.connect(("rpi5", 7100))
                stream = sock.makefile("wb")
                self.picam2.start_recording(encoder, FileOutput(stream))

            while True:
                time.sleep(3600)

        threading.Thread(target=_listen, daemon=True).start()

    def pause_stream(self):
        self.streaming_enabled = False
        self.picam2.stop()
        self.send_debug_message('Video Streaming: Desativado')

    def resume_stream(self):
        if not self.streaming_enabled:
            self.streaming_enabled = True
            self.picam2.start()
            self.send_debug_message('Video Streaming: Reativado')

