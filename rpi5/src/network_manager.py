from .mount_device_manager import MountDeviceManager
import subprocess, re
import time
import ipaddress

class NetworkManager:
    def __init__(self):
        self.info = {
            "address": None,
            "netmask": None,
            "broadcast": None,
            "network": None
        }
    
    def update_address(self, interface_name="eth1", config_path="/media/usb-ssd/") -> bool:
        try:
            if self.get_ip_from_file(config_path):
                self.__update_static_ip(interface_name)
            else:
                self.__set_dhcp(interface_name)
            
            subprocess.run(["sudo", "mv", "new_interface", "/etc/network/interfaces.d"]) # update the configuration file
            subprocess.run(["sudo", "systemctl", "restart", "networking.service"]) # restart service
            return True
        
        except:
            return False

    def get_ip_from_file(self, config_path):
        try:
            with open(config_path + "ip-config.txt") as file:
                lines = file.readlines()
                for line in lines:
                    keywords = line[:-1].split(" ")
                    key = keywords[0]
                    ipv4 = ipaddress.ip_address(keywords[1])
                    if key in self.info.keys():
                        self.info[keywords[0]] = keywords[1]
                    else:
                        raise TypeError("The entry must be ", self.info.keys())
                if None in self.info.values():
                    raise AttributeError("One network configuration was not set.")
            time.sleep(.5)
            return True
       
        except FileNotFoundError:
            return False # When there is no available ipconfig.txt

        except ValueError:
            return False # When the IPV4 is invalid

        except TypeError:
            return False # When the entry is not valid (not address, nor netmask, ...)

        except AttributeError:
            return False # When one attribute is missing on ipconfig.txt

    def __update_static_ip(self, interface_name):
        with open("new_interface", "w+") as file:
            file.write(f"auto {interface_name}\n")
            file.write(f"iface {interface_name} inet static\n")
            for key in self.info.keys():
                file.write(key + " " + self.info[key] + "\n")

    def __set_dhcp(self, intarface_name):
        with open("new_interface", "w+") as file:
            file.write(f"auto {interface_name}\n")
            file.write(f"iface {interface_name} inet dhcp\n")
            file.write(f"allow-hotplug {interface_name}")

    def get_ip(self, interface: str):
        try:
            cmdline = f'ip a show {interface}'
            output = subprocess.check_output(cmdline, shell=True).decode()
            matches = re.search(r'inet\s+(\d+\.\d+\.\d+\.\d+)', output)

            if matches:
                return matches.group(1)
        finally:
            return 'ERRO'


if __name__ == "__main__":
    usb_device = MountDeviceManager(device="/dev/sda1", mount_point="/media/usb-ssd")
    usb_device.mount()
    network_manager = NetworkManager()
    network_manager.update_address(interface_name="eth1")
    usb_device.unmount()
