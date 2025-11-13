import threading
from queue import Queue

from .hal.camera import CameraNull, CameraUDP, CameraPicamera2
from .hal.display import DisplayNull, DisplaySSD1306
from .hal.encoder import EncoderNull, EncoderGPIO
from .hal.imu import ImuNull, ImuUDP
from .hal.network_interface import NetworkInterfaceConfigFile
from .hal.relay import RelayNull, RelayGPIO
from .hal.thermal_sensors import ThermalSensorsNull, ThermalSensorsRaspberry
from .mount_device_manager import MountDeviceManager
from .acquisition_writer import AcquisitionWriter


class EncoderGS:
    def __init__(self, *, default_modo_lambda, debug=False):
        self.status = {
            "rpi5": {
                "temp": 0.0,
                "ip": "0.0.0.0",
            },
            "rpi0": False,
            "camera": False,
            "imu": False,
            "pos": {"x": 0, "y": 0},
            "modo": "Iniciando",
            "estado": "",
            "msg": "",
        }
        self.status_lock = threading.Lock()

        if debug:
            self.camera = CameraNull()
            self.display = DisplayNull()
            self.encoders = (EncoderNull(), EncoderNull(), EncoderNull())
            self.imu = ImuNull()
            self.network_interface = NetworkInterfaceConfigFile(self, "eno1", "/tmp")
            self.relay = RelayNull()
            self.thermal_sensors = ThermalSensorsNull()
            self.ssd_manager = MountDeviceManager(
                device="/dev/sda1", mount_point="/media/usb-ssd"
            )
        else:
            try:
                self.camera = CameraPicamera2(self)
            except IndexError:
                self.camera = CameraUDP(self)

            self.display = DisplaySSD1306(self)
            self.encoders = (
                EncoderGPIO(PIN_A=26, PIN_B=19),
                EncoderGPIO(PIN_A=5, PIN_B=23),
                EncoderGPIO(PIN_A=6, PIN_B=13),
            )
            self.imu = ImuUDP(self)
            self.network_interface = NetworkInterfaceConfigFile(
                self, "eth1", "/media/usb-ssd/"
            )
            self.relay = RelayGPIO()
            self.thermal_sensors = ThermalSensorsRaspberry(self)
            self.ssd_manager = MountDeviceManager(
                device="/dev/sda1", mount_point="/media/usb-ssd"
            )

            self.camera.start()
            self.display.start()
            self.imu.start()

        self.ssd_manager.mount()
        self.network_interface.set_ip_address(None)
        self.ssd_manager.unmount()

        self.pi_zero_api = AcquisitionWriter(self)

        self._event_queue = Queue(4)

        self.modo = default_modo_lambda(self)

    def get(self, prop):
        return self.status[prop]

    def set(self, prop, value):
        self.status[prop] = value

    def get_status(self) -> dict:
        with self.status_lock:
            s = self.status.copy()
            self.status["msg"] = ""
        return s

    def add_message(self, msg):
        with self.status_lock:
            self.status["msg"] += msg + "\n"

    def send_event(self, ev):
        self._event_queue.put(ev)

    def poll_event(self):
        if self._event_queue.empty():
            return False
        else:
            return self._event_queue.get_nowait()

    def set_modo(self, modo):
        self.modo.stop()
        self.modo = modo
