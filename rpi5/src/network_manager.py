from usb_manager import *
import time

class NetworkManager:
    def __init__(self):
        self.usb = UsbManager()
        self.info = {
            "address": None,
            "netmask": None,
            "broadcast": None,
            "network": None
                }
    
    def update_address(self, device="eth0", config_path="/media/usb-ssd/") -> bool:
        try:
            if self.get_ip_from_file(config_path):
                self.__update_interface(device)
            else:
                self.__set_dhcp_interface(device)

            subprocess.run(["sudo", "mv", "new_interface", "/etc/network/interfaces.d"])
            subprocess.run(["sudo", "systemctl", "restart", "networking.service"])
            return False
        
        except:
            return False

    def get_ip_from_file(self, config_path):
        try:
            self.usb.mount()
            with open(config_path + "ip-config.txt") as file:
                lines = file.readlines()
                for line in lines:
                    keywords = line[:-1].split(" ")
                    self.info[keywords[0]] = keywords[1]
            time.sleep(.5)
            return True
        
        except FileNotFoundError:
           return False

        finally:
            self.usb.unmount()

    def __update_interface(self, device):
        with open("new_interface", "w+") as file:
            file.write(f"auto {device}\n")
            file.write(f"iface {device} inet static\n")
            for key in self.info.keys():
                file.write(key + " " + self.info[key] + "\n")

    def __set_dhcp_interface(self, device):
        with open("new_interface", "w+") as file:
            file.write(f"auto {device}\n")
            file.write(f"iface {device} inet dhcp\n")
            file.write(f"allow-hotplug {device}")

if __name__ == "__main__":
    n = NetworkManager()
    n.update_address(device="eth0")
