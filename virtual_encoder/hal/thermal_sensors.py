from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from virtual_encoder.virtual_encoder import VirtualEncoder


class ThermalSensorsNull:
    def get_cpu_temp(self):
        return 0

    def get_camera_temp(self):
        return 0


class ThermalSensorsRaspberry:
    def __init__(self, ve: "VirtualEncoder"):
        self.ve = ve

    def get_cpu_temp(self):
        with open("/sys/class/thermal/thermal_zone0/temp", "r") as file:
            return int(file.read()) / 1000

    def get_camera_temp(self):
        rpi0 = self.ve.get_status()["rpi0"]
        if rpi0:
            return rpi0["temp"]
        else:
            return 0
