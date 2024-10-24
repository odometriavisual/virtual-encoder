

import time
import subprocess

class UsbManager:
    def __init__(self, device="sda1", mount_point="/media/usb-ssd"):
        self.device = device
        self.mounted = False
        self.mount_path = mount_point

    def mount(self) -> bool:
        try:
            subprocess.run(["sudo", "udisksctl", "mount", "-b", "/dev/" + self.device])
            time.sleep(.5)
            self.mounted = True
            return True
        except:
            return False

    def unmount(self) -> bool:
        try:
            time.sleep(.5)
            subprocess.run(["sudo", "udisksctl", "unmount", "-b", "/dev/" + self.device])
            self.mounted=False
            return True
        except:
            return False
 
    def clean(self, folder="picam_imgs") -> bool:
        if not self.mount():
            return False

        try:
            subprocess.run(["rm", "-r", self.mount_point + self.folder_name + "/"])
        except SubprocessError:
            return False
        
        if not self.__unmount():
            return False
        
        return True

if __name__ == "__main__":
    print("Before mounting")
    ssd = UsbManager(device="sda1", mount_point="/media/usb-ssd")

    print("ssd.mount() = ", ssd.mount())
    print("Mounted")
    #print("ssd.unmount() = ",ssd.unmount())
    #print("Unmounted")
