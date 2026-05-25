import ipaddress
import subprocess
import re
from pathlib import Path

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from virtual_encoder.encoder_gs import EncoderGS


class NetworkInterfaceNull:
    def get_ip_address(self):
        pass


class NetworkInterfaceConfigFile(NetworkInterfaceNull):
    def __init__(self, gs: "EncoderGS", interface: str, config_path: str):
        super().__init__()

        self.gs = gs
        self.interface = interface
        self.config_path = Path(config_path)

    def get_ip_address(self):
        try:
            cmdline = f"ip a show {self.interface}"
            output = subprocess.check_output(cmdline, shell=True).decode()
            matches = re.search(r"inet\s+(\d+\.\d+\.\d+\.\d+)", output)

            if matches:
                return matches.group(1)
            else:
                return "None"
        except subprocess.SubprocessError:
            return "IFACE not found"
