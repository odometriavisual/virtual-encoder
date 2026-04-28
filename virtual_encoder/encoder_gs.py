import threading
import time
from pathlib import Path
from queue import Queue

from .hal.camera import CameraImage, CameraNoise, CameraUDP, CameraPicamera2
from .hal.display import DisplayNull, DisplaySSD1306
from .hal.encoder import EncoderNull, EncoderGPIO
from .hal.imu import ImuNull, ImuI2C, ImuUDP
from .hal.network_interface import NetworkInterfaceConfigFile
from .hal.relay import RelayNull, RelayGPIO
from .hal.led import LedNull, LedSerdes
from .hal.serdes import SerdesNull, Serdes
from .hal.thermal_sensors import ThermalSensorsNull, ThermalSensorsRaspberry
from .mount_device_manager import MountDeviceManager
from .acquisition_writer import AcquisitionWriter


class EncoderGS:
    def __init__(self, config, *, default_modo_lambda):
        self.config = config

        spatial_resolution_cache_path = Path(self.config.get("camera", dict()).get("spatial_resolution_cache", "/home/pi/spatial_resolution.txt"))
        self.spatial_resolution = 1

        if spatial_resolution_cache_path.is_file():
            try:
                with open(spatial_resolution_cache_path) as file:
                    self.spatial_resolution = float(file.read())
            except Exception:
                pass
        
        self.status = {
            "version": config["version"],
            "rpi5": {
                "temp": 0.0,
                "ip": "0.0.0.0",
            },
            "display": False,
            "camera": False,
            "imu": False,
            "pos": {"x": 0, "y": 0},
            "modo": "Iniciando",
            "estado": "",
            "msg": "",
        }
        self.status_lock = threading.Lock()

        def __parallel_setup_camera():
            self.__setup_serdes()
            time.sleep(1)
            self.__setup_camera()

        setup_camera_thread = threading.Thread(target=__parallel_setup_camera, daemon=True)
        setup_camera_thread.start()

        self.__setup_display()
        self.__setup_encoders()
        self.__setup_relay()
        self.__setup_imu()
        self.__setup_led()
        self.__setup_thermal_sensors()
        self.__setup_acquisition_writer()

        # ssd_manager must be set up before network interface
        # self.__setup_ssd_manager()
        self.__setup_network_interface()

        self._event_queue = Queue(4)

        setup_camera_thread.join()
        self.modo = default_modo_lambda(self)

    def __setup_display(self):
        if self.config["debug"]:
            self.display = DisplayNull()
        else:
            try:
                self.display = DisplaySSD1306(
                    self,
                    width=self.config["display"]["width"],
                    height=self.config["display"]["height"],
                    i2c_scl=self.config["gpio"]["scl"],
                    i2c_sda=self.config["gpio"]["sda"],
                    addr=self.config["display"]["address"],
                )
                self.display.start()
            except Exception:
                self.display = DisplayNull()

    def __setup_encoders(self):
        if self.config["debug"]:
            self.encoders = (EncoderNull(), EncoderNull(), EncoderNull())
        else:
            self.encoders = [
                EncoderGPIO(PIN_A=pins["A"], PIN_B=pins["B"])
                for pins in self.config["gpio"]["encoders_panther"]
            ]

    def __setup_relay(self):
        if self.config["debug"]:
            self.relay = RelayNull()
        else:
            self.relay = RelayGPIO(self.config["gpio"]["relay"])

    def __setup_imu(self):
        if self.config["debug"]:
            self.imu = ImuNull()
        elif self.config["use_legacy_camera"]:
            self.imu = ImuUDP(self)
            self.imu.start()
        else:
            self.imu = ImuI2C(self)
            self.imu.start()

    def __setup_led(self):
        if self.config["debug"] or self.config["use_legacy_camera"]:
            self.led = LedNull()
        else:
            self.led = LedSerdes(self.config["gpio"]["led"])
            self.led.turn_on()

    def __setup_serdes(self):
        if self.config["debug"] or self.config["use_legacy_camera"]:
            self.serdes = SerdesNull()
        else:
            self.serdes = Serdes(
                bnoreset_pin=self.config["gpio"]["bno_reset"],
                powerdown_pin=self.config["gpio"]["serdes_powerdown"],
                seraddr=self.config["serdes"]["serializer_address"],
                desaddr=self.config["serdes"]["deserializer_address"],
                verbose=self.config["serdes"]["verbose"],
                monitor=self.config["serdes"]["eye_monitor"],
                force_camera_on=self.config["serdes"]["force_camera_on"],
                enable_driver=True,
            )

            self.serdes.start()

    def __setup_thermal_sensors(self):
        if self.config["debug"]:
            self.thermal_sensors = ThermalSensorsNull()
        else:
            self.thermal_sensors = ThermalSensorsRaspberry(self)

    def __setup_ssd_manager(self):
        if self.config["debug"]:
            self.ssd_manager = None
        else:
            self.ssd_manager = MountDeviceManager(
                device="/dev/sda1", mount_point="/media/usb-ssd"
            )

    def __setup_network_interface(self):
        if self.config["debug"]:
            self.network_interface = NetworkInterfaceConfigFile(self, "eno1", "/tmp")
        else:
            self.network_interface = NetworkInterfaceConfigFile(
                self, self.config["network"]["interface"], "/home/pi/"
            )
            # self.ssd_manager.mount()
            # self.network_interface.set_ip_address(None)
            # self.ssd_manager.unmount()

    def __setup_camera(self):
        exposure_cache_path = Path(self.config.get("camera", dict()).get("exposure_cache", "/home/pi/exposure.txt"))
        exposure = None

        if exposure_cache_path.is_file():
            try:
                with open(exposure_cache_path) as file:
                    exposure = int(file.read())
            except Exception:
                pass

        if self.config["debug"]:
            self.camera = CameraNoise()
        elif self.config["use_legacy_camera"]:
            self.camera = CameraUDP(self)
        else:
            try:
        
                self.camera = CameraPicamera2(self, exposure)
                self.camera.start()
            except IndexError:
                self.camera = CameraImage("extra/nocamera.jpg")

    def __setup_acquisition_writer(self):
        self.acquisition_writer = AcquisitionWriter(
            self.config["acquisition"]["directory"], self
        )

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
