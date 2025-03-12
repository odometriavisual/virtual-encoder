import threading

class EncoderStatus:
    def __init__(self):
        self.status = {
            'rpi5': {
                'temp': 0.,
                'ip': '0.0.0.0',
            },
            'rpi0': {
                'temp': 0.,
            },
            'camera': False,
            'imu': False,
            'pos': {
                'x': 0,
                'y': 0
            },
            'modo': 'Iniciando',
            'estado': '',
            'msg': ''
        }
        self.status_lock = threading.Lock()

    def get(self, prop):
        return self.status[prop]

    def set(self, prop, value):
        self.status[prop] = value

    def get_status(self) -> dict:
        with self.status_lock:
            s = self.status.copy()
            self.status['msg'] = ''
        return s

    def add_message(self, msg):
        with self.status_lock:
            self.status['msg'] += msg + '\n'

