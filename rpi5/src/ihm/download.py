import time
import subprocess

# No fstab adicionar :
# /dev/sda1  /media/usb-ssd      auto  nofail,rw,user,exec,umask=000  0       0

class Downloader:
    def __init__(self):
        self.process: subprocess.Popen = None
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
                {
                    "path": "/media/usb-ssd"}
        }

    def generate_runlist(self, src_name="rpi0", dest_name="ssd"):
        src = f"""{self.devices[src_name]["username"]}@{self.devices[src_name]["ip"]}:{self.devices[src_name]["path"]}"""
        dest = f"""{self.devices[dest_name]["path"]}"""
        return ["sshpass", "-p", self.devices["rpi0"]["password"], "rsync", "-r", "-v", "--bwlimit=5000",
                "--info=progress2", src, dest]
    
    def __mount(self, runlist=None) -> bool:
        try:
            subprocess.run(["udisksctl", "mount", "-b", "/dev/sda1"])
            time.sleep(.5)
            return True
        except:
            return False


    def __unmount(self) -> bool:
        try:
            time.sleep(.5)
            subprocess.run(["sudo", "udisksctl", "unmount", "-b", "/dev/sda1"])
            return True
        except:
            return False
 


    def start(self, runlist=None):
        if not self.__mount(runlist):
            return False
        try:
            if runlist is None:
                runlist = self.generate_runlist()
            # Inicializa a thread:
            
            self.process = subprocess.Popen(
                runlist,
                stdout=subprocess.PIPE
            )
            
            if not self.__umount():
                return False

            return True

        except:
            return False

    def stop(self) -> bool:
        self.process = None
        try:
            self.__unmount()
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
                return self.process.returncode == 0  # has finished

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

    def delete_ssdfiles(self):
        if not self.__mount():
            return False
        try: 
            subprocess.run(["rm", "-r", "/media/usb-ssd/picam_imgs/"])
        finally:
            if not self.__unmount():
                return False


if __name__ == "__main__":
    d = Downloader()

    # Alternativa 1 de uso:
    #print(d.download())

    # Alternativa 2 (sem tratamento de erro):
    d.start()  # Pode retornar True | False
    while d.process.poll() is None:
        output = d.get_status() # Pode ser: "STRING" | True | False
        if isinstance(output, str):
            print(output)
        # (True = Finalizou execução perfeitamente, False = contrario)
    d.stop()  # Pode retornar True | False
    
    # Uso do removedor:
    #d.delete_ssdfiles()
