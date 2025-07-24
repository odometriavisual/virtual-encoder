import numpy as np
import cv2
import threading
import time

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from ..encoder_gs import EncoderGS


class CameraNull:
    def __init__(self):
        self.default_frame = np.full((240, 320, 3), (150, 150, 150), dtype=np.uint8)

    def toggle(self):
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
        self.is_enabled = True
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

    def toggle(self):
        if self.is_enabled:
            self.gs.pi_zero_api.pause_stream()
            self.is_enabled = False
        else:
            self.gs.pi_zero_api.resume_stream()
            self.is_enabled = True

    def get_img(self):
        if self._new_frame_event.wait(3):
            self.is_enabled = True
        else:
            self.is_enabled = False
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
