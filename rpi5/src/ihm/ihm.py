from queue import Queue
from .display import Screen

from ..status import EncoderStatus

class IHM:
    def __init__(self, get_img, status: EncoderStatus):
        self._event_queue = Queue(4)
        self._threads = []

        self.oled_screen = Screen()
        self.get_img = get_img

        self.status = status

    def send_event(self, ev):
        self._event_queue.put(ev)

    def update_display(self):
        camera = 'Ok' if self.status.get('camera') else 'Err.'
        rpi_zero = 'Ok' if self.status.get('rpi0') else 'Err.'
        imu = 'Ok' if self.status.get('imu') else 'Err.'

        self.oled_screen.drawLine(0, f'MODO: {self.status.get("modo")}', 'center')
        self.oled_screen.drawLine(1, f'ESTADO: {self.status.get("estado")}', 'center')

        self.oled_screen.drawLine(2, f'IP: {self.status.get("rpi5")["ip"]}')
        self.oled_screen.drawLine(3, f'CAM : {camera}')
        self.oled_screen.drawLine(4, f'piZ: {rpi_zero} | IMU: {imu}')

        self.oled_screen.update()

    def poll_event(self):
        if self._event_queue.empty():
            return False
        else:
            return self._event_queue.get_nowait()
