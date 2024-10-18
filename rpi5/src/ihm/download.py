import time
import subprocess
import os

# No fstab adicionar :
# /dev/sda1  /media/usb-ssd      auto rw,user,exec,umask=000  0       0 

class Downloader:
    def __init__(self, devices=None):
        self.process = None
        self.status_buffer = list()

        
        if devices is None:
            self.devices = {
                    "rpi0":
                    {
                        "ip":"192.168.0.3",
                        "username":"pi",
                        "password":"pi",
                        "path":"/home/pi/picam_imgs"
                        },
                    "rpi5":
                    {
                        "ip":"192.168.0.2",
                        "username":"pi",
                        "password":"pi",
                        "path":"/home/pi/picam_imgs"
                        },
                    "ssd":
                    {"path":"/media/usb-ssd"}
                    }
        else:
            self.devices = devices

    def download(self, src_name="rpi0", dest_name="ssd", async_mode=True) -> bool:
        src = f"""{self.devices[src_name]["username"]}@{self.devices[src_name]["ip"]}:{self.devices[src_name]["path"]}"""
        dest = f"""{self.devices[dest_name]["path"]}"""
        self.run_list = ["sshpass", "-p", self.devices["rpi0"]["password"], "rsync", "-r", "-v", "--bwlimit=5000", "--info=progress2", src, dest]
        try:
            subprocess.run(["sudo", "mount", "-a"])
            time.sleep(.5)
            self.process = subprocess.Popen(
                    self.run_list,
                    stdout=subprocess.PIPE
                    )
            
            while self.process.poll() is None:
                line = self.process.stdout.readline().decode()
                print(line)
                self.status_buffer.append(line)

        except subprocess.CalledProcessError as e:
            print(f"rsync error: {e}")
            return False

        except KeyboardInterrupt:
            print("Transferência Cancelada Prematuramente")
            return False
        
        finally:
            time.sleep(.5)
            subprocess.run(["sudo", "umount", "/media/usb-ssd"])
        
        return True
if __name__=="__main__":
    d = Downloader()
    print(d.download())
