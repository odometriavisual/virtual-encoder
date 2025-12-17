from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from ..encoder_gs import EncoderGS


class ThermalSensorsNull:
    def get_cpu_temp(self):
        return 0

    def get_camera_temp(self):
        return 0


class ThermalSensorsRaspberry:
    def __init__(self, gs: "EncoderGS"):
        self.gs = gs

    def get_cpu_temp(self):
        with open("/sys/class/thermal/thermal_zone0/temp", "r") as file:
            return int(file.read()) / 1000

    def get_camera_temp(self):
        rpi0 = self.gs.get_status()["rpi0"]
        if rpi0:
            return rpi0["temp"]
        else:
            return 0
