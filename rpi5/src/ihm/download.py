import subprocess
import os

class Downloader:
    def __init__(self, SRC_IP="192.168.0.3", SRC_PATH="/home/pi/picam_imgs", DEST_PATH="/home/pi/picam_imgs"):
        self.run_list = ["sshpass", "-p", "pi", "rsync", "-raz", '--info=progress2', "--stats", f"{SRC_IP}:{SRC_PATH}/*", DEST_PATH]
        self.SRC_IP = SRC_IP
        self.SRC_PATH = SRC_PATH
        self.DEST_PATH = DEST_PATH
        self.process = None

    def download(self, async_mode=True) -> bool:
        try:
            self.process = subprocess.Popen(
                    self.run_list,
                    stdout=subprocess.PIPE
                    )

            if not async_mode:
                # Sync mode = Blocks thread until operation is finished
                self.process.wait()
                return True
            else:
                # Async mode = Don't block thread. Operation will run on background
                return None

        except subprocess.CalledProcessError as e:
            print(f"rsync error: {e}")
            return False

        except KeyboardInterrupt:
            print("Transferência Cancelada Prematuramente")
            return False

if __name__=="__main__":
    d = Downloader()
    print("Before download")
    print(d.download())

    # Exemplo de uso para string com progresso:
    try:
        while d.process.poll() is None:
            line = d.process.stdout.readline(200).decode()
            print(line)
    except d.process.CalledProcessError as e:
        print(f"rsync error: {e}")
    except KeyboardInterrupt:
        print("Transferência cancelada prematuramente por KeyboardInterrupt")
    
    print("After download")
