from queue import Queue
from .display import Screen

class IHM:
    def __init__(self, get_img):
        self._event_queue = Queue(4)
        self._threads = []

        self.oled_screen = Screen()

        self.modo: str = ''
        self.estado: str = ''
        self.ip: str = ''

        self.camera_status: str  = ''
        self.imu_status: str  = ''
        self.rpiZero_status: str  = ''

    def send_event(self, ev):
        self._event_queue.put(ev)

    def update_display(self):
        self.oled_screen.drawLine(0, f'MODO: {self.modo}', 'center')
        self.oled_screen.drawLine(1, f'ESTADO: {self.estado}', 'center')

        self.oled_screen.drawLine(2, f'IP: {self.ip}')
        self.oled_screen.drawLine(3, f'CAM : {self.camera_status}')
        self.oled_screen.drawLine(4, f'piZ: {self.rpiZero_status} | IMU: {self.imu_status}')

        self.oled_screen.update()

    def poll_event(self):
        if self._event_queue.empty():
            return False
        else:
            return self._event_queue.get_nowait()
