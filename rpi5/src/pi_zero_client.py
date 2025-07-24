import subprocess
import time
from subprocess import SubprocessError

import requests
from requests.exceptions import RequestException

from .hal.camera import CameraNull
from .hal.imu import ImuNull
from .hal.relay import RelayNull

PIZERO_HOST = "rpi0"
WEBSERVER_PORT = 7123
STREAM_PORT = 7100


class PiZeroClient:
    def __init__(self, gs):
        self.gs = gs

        self.stream_enabled = True

    def set_focus(self, focus: float):
        self.gs.camera.set_focus(focus)

    def set_exposure(self, exposure: int):
        self.gs.camera.set_exposure(exposure)

    def get_img(self):
        return self.gs.camera.get_img()

    def toggle_stream(self):
        if self.stream_enabled:
            self.pause_stream()
        else:
            self.resume_stream()
        self.stream_enabled = not self.stream_enabled

    def pause_stream(self):
        self.gs.camera.disable()
        self.stream_enabled = False

    def resume_stream(self):
        self.gs.camera.enable()
        self.stream_enabled = True

    def get_orientation(self) -> list[float]:
        return [*self.gs.imu.get_orientation(), 0.0]

    def get_status(self):
        try:
            return requests.get(
                f"http://{PIZERO_HOST}:{WEBSERVER_PORT}/status?rpi5status={self.gs.get('estado')}",
                timeout=1.0,
            ).json()
        except RequestException:
            return False

    def get_file_count(self) -> int:
        try:
            file_count = requests.get(
                f"http://{PIZERO_HOST}:{WEBSERVER_PORT}/file_count", timeout=15.0
            ).text.strip()
            return int(file_count)
        except (RequestException, ValueError):
            return 0

    def start_acquisition(self, timestamp_ns, reason, pulses_period_ns):
        try:
            requests.get(
                f"http://{PIZERO_HOST}:{WEBSERVER_PORT}/start_acquisition?ts={timestamp_ns}&r={reason}&p={pulses_period_ns}",
                timeout=1.0,
            )
            return True
        except (RequestException, ValueError):
            return False

    def stop_acquisition(self):
        try:
            requests.get(
                f"http://{PIZERO_HOST}:{WEBSERVER_PORT}/stop_acquisition", timeout=1.0
            )
            return True
        except (RequestException, ValueError):
            return False

    def poweroff(self):
        self.poweroff_rpi0()

        try:
            subprocess.run(["sudo", "poweroff"])
        except SubprocessError:
            pass

    def poweroff_rpi0(self):
        try:
            requests.get(f"http://{PIZERO_HOST}:{WEBSERVER_PORT}/poweroff", timeout=1.0)
        except RequestException:
            pass

    def poweroff_relay(self):
        self.gs.relay.turn_off()

    def reboot(self):
        self.reboot_rpi0()

        try:
            subprocess.run(["sudo", "reboot"])
        except SubprocessError:
            pass

    def reboot_rpi0(self):
        try:
            requests.get(f"http://{PIZERO_HOST}:{WEBSERVER_PORT}/reboot", timeout=1.0)
        except RequestException:
            pass

    def reboot_relay(self):
        self.gs.relay.turn_off()
        time.sleep(10)
        self.gs.relay.turn_on()
