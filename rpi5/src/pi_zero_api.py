import requests
from requests.exceptions import RequestException


class PiZeroApi:
    def __init__(self, gs):
        self.PIZERO_HOST = "rpi0"
        self.WEBSERVER_PORT = 7123
        self.gs = gs

    def set_focus(self, focus: float):
        try:
            requests.get(
                f"http://{self.PIZERO_HOST}:{self.WEBSERVER_PORT}/focus/{focus}",
                timeout=1.0,
            )
        except RequestException:
            pass

    def set_exposure(self, exposure: int):
        try:
            requests.get(
                f"http://{self.PIZERO_HOST}:{self.WEBSERVER_PORT}/exposure/{exposure}",
                timeout=1.0,
            )
        except RequestException:
            pass

    def get_status(self):
        try:
            return requests.get(
                f"http://{self.PIZERO_HOST}:{self.WEBSERVER_PORT}/status?rpi5status={self.gs.get('estado')}",
                timeout=1.0,
            ).json()
        except RequestException:
            return False

    def get_file_count(self) -> int:
        try:
            file_count = requests.get(
                f"http://{self.PIZERO_HOST}:{self.WEBSERVER_PORT}/file_count",
                timeout=15.0,
            ).text.strip()
            return int(file_count)
        except (RequestException, ValueError):
            return 0

    def start_acquisition(self, timestamp_ns, reason, pulses_period_ns):
        try:
            requests.get(
                f"http://{self.PIZERO_HOST}:{self.WEBSERVER_PORT}/start_acquisition?ts={timestamp_ns}&r={reason}&p={pulses_period_ns}",
                timeout=1.0,
            )
            return True
        except (RequestException, ValueError):
            return False

    def stop_acquisition(self):
        try:
            requests.get(
                f"http://{self.PIZERO_HOST}:{self.WEBSERVER_PORT}/stop_acquisition",
                timeout=1.0,
            )
            return True
        except (RequestException, ValueError):
            return False

    def poweroff_rpi0(self):
        try:
            requests.get(
                f"http://{self.PIZERO_HOST}:{self.WEBSERVER_PORT}/poweroff", timeout=1.0
            )
        except RequestException:
            pass

    def reboot_rpi0(self):
        try:
            requests.get(
                f"http://{self.PIZERO_HOST}:{self.WEBSERVER_PORT}/reboot", timeout=1.0
            )
        except RequestException:
            pass

    def pause_stream(self):
        try:
            requests.get(
                f"http://{self.PIZERO_HOST}:{self.WEBSERVER_PORT}/pause_stream",
                timeout=1.0,
            )
        except RequestException:
            pass

    def resume_stream(self):
        try:
            requests.get(
                f"http://{self.PIZERO_HOST}:{self.WEBSERVER_PORT}/resume_stream",
                timeout=1.0,
            )
        except RequestException:
            pass
