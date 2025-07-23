import numpy as np


class CameraNull:
    def __init__(self):
        self.default_frame = np.full((240, 320, 3), (150, 150, 150), dtype=np.uint8)

    def enable(self):
        pass

    def disable(self):
        pass

    def get_img(self):
        return self.default_frame.copy()

    def set_exposure(self, exposure: int):
        pass

    def set_focus(self, focus: float):
        pass
