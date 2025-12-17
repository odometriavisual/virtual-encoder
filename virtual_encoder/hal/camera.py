import numpy as np
import cv2
import threading
import time

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from virtual_encoder.encoder_gs import EncoderGS


class CameraNull:
    def __init__(self):
        self.default_frame = np.full((240, 320, 3), (150, 150, 150), dtype=np.uint8)

    def start_stream(self):
        pass

    def stop_stream(self):
        pass

    def get_img(self):
        return self.default_frame.copy()

    def peek_img(self):
        return self.default_frame.copy()

    def set_exposure(self, exposure: int):
        pass

    def set_focus(self, focus: float):
        pass


class CameraUDP(CameraNull, threading.Thread):
    def __init__(self, gs: "EncoderGS"):
        CameraNull.__init__(self)
        threading.Thread.__init__(self, daemon=True)

        self.PIZERO_HOST = "rpi0"
        self.STREAM_PORT = 7100

        self.gs = gs

        self._new_frame_event = threading.Event()
        self._frame_lock = threading.Lock()

        self._video_capture = cv2.VideoCapture()
        self._frame = self.default_frame.copy()

    def run(self):
        while True:
            if self._video_capture.isOpened():
                ret, frame = self._video_capture.read()

                if ret:
                    with self._frame_lock:
                        self._frame = frame

                    self._new_frame_event.set()
                else:
                    with self._frame_lock:
                        self._frame = self.default_frame.copy()

                    self._video_capture.release()
                    cv2.destroyAllWindows()

            else:
                self._video_capture.open(f"udp://{self.PIZERO_HOST}:{self.STREAM_PORT}")
                self._video_capture.set(cv2.CAP_PROP_BUFFERSIZE, 1)
                time.sleep(1)

    def start_stream(self):
        self.gs.pi_zero_api.resume_stream()

    def stop_stream(self):
        self.gs.pi_zero_api.pause_stream()

    def get_img(self):
        if not self._new_frame_event.wait(3):
            with self._frame_lock:
                self._frame = self.default_frame.copy()

        with self._frame_lock:
            self._new_frame_event.clear()
            return self._frame.copy()

    def peek_img(self):
        with self._frame_lock:
            return self._frame.copy()

    def set_exposure(self, exposure: int):
        pass

    def set_focus(self, focus: float):
        pass


try:
    from picamera2 import Picamera2

    class CameraPicamera2(CameraNull, threading.Thread):
        def __init__(self, gs: "EncoderGS"):
            CameraNull.__init__(self)
            threading.Thread.__init__(self, daemon=True)

            self.gs = gs

            self._new_frame_condition = threading.Condition()

            self._picam2 = Picamera2()
            self._picam2.configure(
                self._picam2.create_video_configuration(
                    main={"size": (640, 480)}, queue=False
                )
            )
            self._picam2.controls.FrameRate = 60

            self._picam2.start()
            self._frame = self.default_frame.copy()

        def run(self):
            while True:
                frame = self._picam2.capture_array()

                with self._new_frame_condition:
                    self._frame = frame
                    self._new_frame_condition.notify_all()

        def start_stream(self):
            self._picam2.start()

        def stop_stream(self):
            self._picam2.stop()

        def get_img(self):
            with self._new_frame_condition:
                if not self._new_frame_condition.wait(3):
                    self._frame = self.default_frame.copy()

                return self._frame.copy()

        def peek_img(self):
            with self._new_frame_condition:
                return self._frame.copy()

        def set_exposure(self, exposure: int):
            self._picam2.set_controls({"ExposureTime": exposure})

        def set_focus(self, focus: float):
            pass


except Exception:

    class CameraPicamera2:
        def __init__(self, gs: "EncoderGS"):
            raise NotImplementedError
