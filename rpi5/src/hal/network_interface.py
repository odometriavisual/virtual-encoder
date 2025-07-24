import ipaddress
import subprocess
import re
from pathlib import Path

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from ..encoder_gs import EncoderGS


class NetworkInterfaceNull:
    def set_ip_address(self, ip):
        pass

    def get_ip_address(self):
        pass


class NetworkInterfaceConfigFile(NetworkInterfaceNull):
    def __init__(self, gs: "EncoderGS", interface: str, config_path: str):
        super().__init__()

        self.gs = gs
        self.interface = interface
        self.config_path = Path(config_path)

    def _get_dhcp_config(self):
        return f"""
        auto {self.interface}
        iface {self.interface} inet dhcp
        allow-hotplug {self.interface}
        """

    def _get_static_config(self):
        return f"""
        auto {self.interface}
        iface {self.interface} inet static
        address {self.info["address"]}
        netmask {self.info["netmask"]}
        broadcast {self.info["broadcast"]}
        network {self.info["network"]}
        """

    def set_ip_address(self, ip):
        info: dict[str, None | str] = {
            "address": None,
            "netmask": None,
            "broadcast": None,
            "network": None,
        }

        try:
            with open(self.config_path.joinpath("ip-config.txt")) as file:
                for line in file.readlines():
                    keywords = line[:-1].split(" ")

                    key = keywords[0]
                    _ipv4 = ipaddress.ip_address(keywords[1])

                    if key in info.keys():
                        info[keywords[0]] = keywords[1]
                    else:
                        raise TypeError("The entry must be ", info.keys())

                for k, val in info.items():
                    if val is None:
                        self.gs.add_message(f"ip-config.txt: {k} nao foi configurada")

                new_config = self._get_static_config()
        except FileNotFoundError:
            # When there is no available ipconfig.txt
            new_config = self._get_dhcp_config()
        except ValueError:
            self.gs.add_message(f"ip-config.txt: ip {info['address']} invalido")
            return
        except Exception:
            self.gs.add_message("ip-config.txt: erro")
            return

        with open(Path("/tmp/new_interface"), "w+") as file:
            file.write(new_config)

        try:
            subprocess.run(
                ["sudo", "mv", "/tmp/new_interface", "/etc/network/interfaces.d"]
            )  # update the configuration file
            subprocess.run(
                ["sudo", "systemctl", "restart", "networking.service"]
            )  # restart service
        except Exception:
            pass

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
