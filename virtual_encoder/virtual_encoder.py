import threading
import subprocess
import time
from queue import Queue

from .hal.camera import CameraImage, CameraNoise, CameraPicamera2
from .hal.display import DisplayNull, DisplaySSD1306
from .hal.encoder import EncoderNull, EncoderGPIO
from .hal.imu import ImuNull, ImuI2C
from .hal.network_interface import NetworkInterfaceConfigFile
from .hal.relay import RelayNull, RelayGPIO
from .hal.led import LedNull, LedSerdes
from .hal.serdes import SerdesNull, Serdes
from .hal.thermal_sensors import ThermalSensorsNull, ThermalSensorsRaspberry
from .acquisition_writer import AcquisitionWriter
from .modos import ModoAutonomo, ModoCalibracao, ModoOdometro, ModoTempo
from .events_stream import EventsStream
from .config import Config


class VirtualEncoder:
    def __init__(self, config):
        self.config: Config = config

        self.spatial_resolution = self.config.camera_spatial_resolution

        self.status = {
            "version": config.version,
            "rpi5": {
                "temp": 0.0,
                "ip": "0.0.0.0",
            },
            "display": False,
            "camera": False,
            "imu": False,
            "pos": {"x": 0, "y": 0, "sr": 1, "dx": 0, "dy": 0},
            "modo": "Iniciando",
            "estado": "",
        }

        self.log_stream = EventsStream()

        def __parallel_setup_camera():
            self.__setup_serdes()
            time.sleep(1)
            self.__setup_camera()

        setup_camera_thread = threading.Thread(
            target=__parallel_setup_camera, daemon=True
        )
        setup_camera_thread.start()

        self.__setup_display()
        self.__setup_encoders()
        self.__setup_relay()
        self.__setup_imu()
        self.__setup_led()
        self.__setup_thermal_sensors()
        self.__setup_acquisition_writer()
        self.__setup_network_interface()

        self._event_queue = Queue(4)

        setup_camera_thread.join()

        match self.config.default_modo:
            case "ModoOdometro":
                self.modo = ModoOdometro(self)
            case "ModoTempo":
                self.modo = ModoTempo(self)
            case _:
                self.modo = ModoOdometro(self)

    def __setup_display(self):
        if self.config.debug:
            self.display = DisplayNull()
        else:
            try:
                self.display = DisplaySSD1306(
                    self,
                    width=self.config.display_width,
                    height=self.config.display_height,
                    i2c_scl=self.config.gpio_scl,
                    i2c_sda=self.config.gpio_sda,
                    addr=self.config.display_address,
                )
                self.display.start()
            except Exception:
                self.display = DisplayNull()

    def __setup_encoders(self):
        if self.config.debug:
            self.encoders = (EncoderNull(), EncoderNull(), EncoderNull())
        else:
            self.encoders = [
                EncoderGPIO(PIN_A=pins["A"], PIN_B=pins["B"])
                for pins in self.config.gpio_encoders_panther
            ]

    def __setup_relay(self):
        if self.config.debug:
            self.relay = RelayNull()
        else:
            self.relay = RelayGPIO(self.config.gpio_relay)

    def __setup_imu(self):
        if self.config.debug:
            self.imu = ImuNull()
        else:
            self.imu = ImuI2C(self)
            self.imu.start()

    def __setup_led(self):
        if self.config.debug:
            self.led = LedNull()
        else:
            self.led = LedSerdes(self.config.gpio_led)
            self.led.turn_on()

    def __setup_serdes(self):
        if self.config.debug:
            self.serdes = SerdesNull()
        else:
            self.serdes = Serdes(
                bnoreset_pin=self.config.gpio_bno_reset,
                powerdown_pin=self.config.gpio_serdes_powerdown,
                seraddr=self.config.serdes_serializer_address,
                desaddr=self.config.serdes_deserializer_address,
                verbose=self.config.serdes_verbose,
                monitor=self.config.serdes_eye_monitor,
                force_camera_on=self.config.serdes_force_camera_on,
                enable_driver=True,
            )

            self.serdes.start()

    def __setup_thermal_sensors(self):
        if self.config.debug:
            self.thermal_sensors = ThermalSensorsNull()
        else:
            self.thermal_sensors = ThermalSensorsRaspberry(self)

    def __setup_network_interface(self):
        if self.config.debug:
            self.network_interface = NetworkInterfaceConfigFile(self, "eno1")
        else:
            self.network_interface = NetworkInterfaceConfigFile(
                self, self.config.network_interface
            )

    def __setup_camera(self):
        exposure = self.config.camera_exposure

        if self.config.debug:
            self.camera = CameraNoise()
            # self.camera = CameraImage("/tmp/picam_imgs/data/1776189949719039126.jpg")
        else:
            try:
                self.camera = CameraPicamera2(self, exposure)
                self.camera.start()
            except IndexError:
                self.camera = CameraImage("extra/nocamera.jpg")

    def __setup_acquisition_writer(self):
        self.acquisition_writer = AcquisitionWriter(
            self.config.acquisition_directory, self
        )

    def handle_event(self, ev):
        match self.modo, ev:
            case _, ("set_modo", "Autonomo"):
                self.set_modo(ModoAutonomo(self))

            case _, ("set_modo", "Odometro"):
                self.set_modo(ModoOdometro(self))

            case _, ("set_modo", "Tempo"):
                self.set_modo(ModoTempo(self))

            case _, ("shutdown", "all"):
                try:
                    try:
                        self.serdes.shutdown()
                        self.led.turn_off()
                    except Exception:
                        pass
                    subprocess.run(["sudo", "poweroff"])
                except subprocess.SubprocessError:
                    pass

            case _, ("shutdown", "led"):
                self.led.turn_off()

            case _, ("shutdown", "relay"):
                self.relay.turn_off()

            case _, ("reboot", "all"):
                try:
                    subprocess.run(["sudo", "reboot"])
                except subprocess.SubprocessError:
                    pass

            case _, ("reboot", "led"):
                self.led.turn_off()
                self.led.turn_on()

            case _, ("reboot", "relay"):
                self.relay.turn_off()
                time.sleep(5)
                self.relay.turn_on()

            case _, ("set_exposure", value):
                self.camera.set_exposure(value)

            case ModoAutonomo(), ("calibrate", tipo):
                self.set_modo(ModoCalibracao(self, self.config, tipo, "Autonomo"))

            case ModoOdometro(), ("calibrate", tipo):
                self.set_modo(ModoCalibracao(self, self.config, tipo, "Odometro"))

            case ModoTempo(), ("calibrate", tipo):
                self.set_modo(ModoCalibracao(self, self.config, tipo, "Tempo"))

            case _, ("calibrate", tipo):
                self.set_modo(ModoCalibracao(self, self.config, tipo, "Odometro"))

            case _, "start_stream":
                self.camera.start_stream()

            case _, "stop_stream":
                self.camera.stop_stream()

            case _:
                self.modo.handle_event(ev)

    def run(self):
        self.modo.run()

    def get(self, prop):
        return self.status[prop]

    def set(self, prop, value):
        self.status[prop] = value

    def get_status(self) -> dict:
        return self.status.copy()

    def send_event(self, ev):
        self._event_queue.put(ev, block=False)

    def poll_event(self):
        if self._event_queue.empty():
            return False
        else:
            return self._event_queue.get_nowait()

    def set_modo(self, modo):
        self.modo.stop()
        self.modo = modo
