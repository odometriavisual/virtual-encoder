import time
import subprocess
import os


# No fstab adicionar :
# /dev/sda1  /media/usb-ssd      auto rw,user,exec,umask=000  0       0 

class Downloader:
    def __init__(self):
        self.process = None
        self.status_buffer = list()

        self.devices = {
            "rpi0":
                {
                    "ip": "192.168.0.3",
                    "username": "pi",
                    "password": "pi",
                    "path": "/home/pi/picam_imgs"
                },
            "rpi5":
                {
                    "ip": "192.168.0.2",
                    "username": "pi",
                    "password": "pi",
                    "path": "/home/pi/picam_imgs"
                },
            "ssd":
                {"path": "/media/usb-ssd"}
        }

    def generate_runlist(self, src_name="rpi0", dest_name="ssd"):
        src = f"""{self.devices[src_name]["username"]}@{self.devices[src_name]["ip"]}:{self.devices[src_name]["path"]}"""
        dest = f"""{self.devices[dest_name]["path"]}"""
        return ["sshpass", "-p", self.devices["rpi0"]["password"], "rsync", "-r", "-v", "--bwlimit=5000",
                "--info=progress2", src, dest]

    def start(self, runlist=None):
        if runlist is None:
            runlist = self.generate_runlist()
        try:
            # Inicializa a thread:
            subprocess.run(["udiskctl", "mount", "-b", "/dev/sda1"])
            time.sleep(.5)
            self.process = subprocess.Popen(
                runlist,
                stdout=subprocess.PIPE
            )
            return True

        except:
            return False

    def stop(self, mount_point="/media/usb-ssd") -> bool:
        self.process = None
        try:
            time.sleep(.5)
            subprocess.run(["udiskctl", "umount", "-b", mount_point])
            return True

        except:
            return False

    def get_status(self):
        try:
            if self.process.poll() is None:
                line = self.process.stdout.readline().decode()
                self.status_buffer.append(line)
                return line  # still running

            else:
                return True  # has finished

        except:
            return False

    def download(self, src="rpi0", dest="ssd") -> bool:
        runlist = self.generate_runlist(src, dest)

        if not self.start(runlist):
            return False

        while True:
            output = self.get_status()
            if output is False:
                return False
            elif output is True:
                break
            time.sleep(.1)

        if not self.stop():
            return False

        # If all run perfectly, then return true:
        return True


if __name__ == "__main__":
    d = Downloader()

    # Alternativa 1 de uso:
    #print(d.download())

    # Alternativa 2 (sem tratamento de erro):
    d.start()  # Pode retornar True | False

    while d.process.poll is None:
        output = d.get_status() # Pode ser: "STRING" | True | False
        # (True = Finalizou execução perfeitamente, False = contrario)

    d.stop()  # Pode retornar True | False
