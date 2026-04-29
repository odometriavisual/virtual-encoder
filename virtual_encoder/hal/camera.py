import numpy as np
import cv2
import threading
import time

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from virtual_encoder.encoder_gs import EncoderGS


class CameraNull:
    def __init__(self):
        self.default_frame = np.full((240, 320, 3), (150, 0, 0), dtype=np.uint8)

    def start_stream(self):
        pass

    def stop_stream(self):
        pass

    def get_img(self):
        time.sleep(0.1)
        return self.default_frame.copy()

    def peek_img(self):
        return self.default_frame.copy()

    def calibrate_exposure(self, *, min, max, target):
        pass

    def get_exposure(self):
        return 0

    def set_exposure(self, exposure: int):
        pass

    def set_focus(self, focus: float):
        pass

    def binsearch_exposicao(target, frame, bot, cur, top):
        data = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        avg = np.average(data)

        if avg < target:
            bot = cur
        elif avg > target:
            top = cur

        cur = (bot + top) // 2
        return bot, cur, top

class CameraNoise(CameraNull):
    def get_img(self):
        time.sleep(0.1)
        data = np.random.rand(48, 64)

        self.default_frame = np.array(
            155 * np.stack((data, data, data), axis=2)
        ).astype(np.uint8)

        return self.default_frame.copy()

class CameraImage(CameraNull):
    def __init__(self, path):
        CameraNull.__init__(self)
        self.default_frame = cv2.imread(path)

class CameraDrawing(CameraNull):
    def __init__(self, camera_src):
        self.camera_src = camera_src
        self.calib_img = self.camera_src.peek_img()

    def set_img(self, img):
        self.calib_img = img

    def get_img(self):
        return self.camera_src.get_img()

    def peek_img(self):
        return self.calib_img.copy()
        


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

    def calibrate_exposure(self, *, min, max, target):
        pass

    def get_exposure(self):
        pass

    def set_exposure(self, exposure: int):
        pass

    def set_focus(self, focus: float):
        pass


try:
    from picamera2 import Picamera2

    class CameraPicamera2(CameraNull, threading.Thread):
        def __init__(self, gs: "EncoderGS", exposure: int|None):
            CameraNull.__init__(self)
            threading.Thread.__init__(self, daemon=True)

            self.gs = gs

            self._new_frame_condition = threading.Condition()

            self._picam2 = Picamera2()
            self._picam2.configure(
                self._picam2.create_video_configuration(
                    main={"size": (640, 480), "format": "RGB888"}, queue=False
                )
            )
            self._picam2.controls.FrameRate = 60

            self._frame = self.default_frame.copy()

            if exposure:
                self.set_exposure(exposure)

        def run(self):
            while True:
                try:
                    self.start_stream()
                    frame = self._picam2.capture_array()
                    self.gs.set("camera", True)

                    while True:
                        frame = self._picam2.capture_array()

                        with self._new_frame_condition:
                            self._frame = frame
                            self._new_frame_condition.notify_all()

                except Exception:
                    pass

                self.stop_stream()
                time.sleep(5)

        def start_stream(self):
            self._picam2.start()
            self.gs.set("camera", True)

        def stop_stream(self):
            self._picam2.stop()
            self.gs.set("camera", False)

        def get_img(self):
            with self._new_frame_condition:
                if not self._new_frame_condition.wait(3):
                    self._frame = self.default_frame.copy()

                return self._frame.copy()

        def peek_img(self):
            with self._new_frame_condition:
                return self._frame.copy()

        def calibrate_exposure(self, *, min, max, target):
            bot = min
            top = max
            cur = (top + bot) // 2
            count = 20
            while bot < top and count > 0:
                count -= 1
                self.set_exposure(cur)
                time.sleep(0.3)
                bot, cur, top = CameraNull.binsearch_exposicao(
                    target, self.peek_img(), bot, cur, top
                )

        def get_exposure(self):
            metadata = self._picam2.capture_metadata()
            return metadata["ExposureTime"]

        def set_exposure(self, exposure: int):
            self._picam2.controls.ExposureTime = exposure

        def set_focus(self, focus: float):
            pass


except Exception:

    class CameraPicamera2:
        def __init__(self, gs: "EncoderGS"):
            raise NotImplementedError
