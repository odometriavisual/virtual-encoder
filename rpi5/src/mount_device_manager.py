import time
import subprocess
from subprocess import SubprocessError


class MountDeviceManager:
    def __init__(self, device="/dev/sda1", mount_point="/media/usb-ssd"):
        self.device = device
        self.mount_path = mount_point

    def is_mounted(self):
        return (
            subprocess.run(
                ["findmnt", "-S", self.device, "-T", self.mount_path]
            ).returncode
            == 0
        )

    def mount(self) -> bool:
        try:
            if not self.is_mounted():
                subprocess.run(["sudo", "mount", self.device])

            time.sleep(0.5)
            return self.is_mounted()
        except SubprocessError:
            return False

    def unmount(self) -> bool:
        try:
            time.sleep(0.5)
            subprocess.run(["sudo", "umount", self.device])
            return True
        except SubprocessError:
            return False


if __name__ == "__main__":
    print("Before mounting")
    ssd = MountDeviceManager(device="/dev/sda1", mount_point="/media/usb-ssd")

    print(f"ssd.mount() = {ssd.mount()}")
    print(f"Mounted: {ssd.is_mounted()}")
    # print("ssd.unmount() = ",ssd.unmount())
    # print("Unmounted")
