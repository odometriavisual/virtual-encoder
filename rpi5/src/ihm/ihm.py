from queue import Queue
from .display import Screen

class IHM:
    def __init__(self, get_img):
        self._event_queue = Queue(4)
        self._threads = []

        self.oled_screen = Screen()
        self.get_img = get_img

        self.modo: str = ''
        self.estado: str = ''
        self.ip: str = ''

        self.status: dict = {
            'rpiZero': False,
            'imu': False,
            'camera': False,
        }

    def send_event(self, ev):
        self._event_queue.put(ev)

    def update_display(self):
        camera = 'Ok' if self.status['camera'] else 'Err.'
        rpi_zero = 'Ok' if self.status['rpiZero'] else 'Err.'
        imu = 'Ok' if self.status['imu'] else 'Err.'

        self.oled_screen.drawLine(0, f'MODO: {self.modo}', 'center')
        self.oled_screen.drawLine(1, f'ESTADO: {self.estado}', 'center')

        self.oled_screen.drawLine(2, f'IP: {self.ip}')
        self.oled_screen.drawLine(3, f'CAM : {camera}')
        self.oled_screen.drawLine(4, f'piZ: {rpi_zero} | IMU: {imu}')

        self.oled_screen.update()

    def poll_event(self):
        if self._event_queue.empty():
            return False
        else:
            return self._event_queue.get_nowait()
