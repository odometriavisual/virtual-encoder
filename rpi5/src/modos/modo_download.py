import time

from ..ihm.ihm import IHM
from ..download import Downloader
from ..mount_device_manager import MountDeviceManager
from ..pi_zero_client import PiZeroClient

class ModoDownload:
    def __init__(self, client: PiZeroClient, ihm: IHM, mount_manager: MountDeviceManager):
        self.client = client

        self.ihm = ihm

        self.ssd_manager = mount_manager
        self.dowloader = Downloader()

        self.ihm.modo = 'Download'
        self.ihm.estado = 'Inicializando...'

        self.transfered_files = 0

        self.file_count = client.get_file_count()

        if self.file_count == 0:
            self.ihm.estado = 'Nenhum ensaio salvo'
            time.sleep(5)
            self.ihm.send_event(('next_modo', 'Tempo'))
            return

        self.client.disable_streaming()

        is_mounted = self.ssd_manager.mount()

        if not is_mounted:
            self.ihm.estado = 'Erro SSD não encontrado'
            time.sleep(5)
            self.ihm.send_event(('next_modo', 'Tempo'))
            self.client.enable_streaming()

        is_downloading = self.dowloader.start()

        if not is_downloading:
            self.ihm.estado = 'Erro no download'
            time.sleep(5)
            self.ihm.send_event(('next_modo', 'Tempo'))
            self.client.enable_streaming()

    def run(self):
        status = self.dowloader.get_status()
        match status:
            case True | False:
                self.dowloader.stop()
                self.ssd_manager.unmount()
                self.ihm.estado = 'Concluida' if status else 'Erro'
                self.ihm.send_event(('next_modo', 'Tempo'))
                self.client.enable_streaming()
                time.sleep(5)

            case line:
                self.transfered_files += 1
                percent = min((100 * self.transfered_files) // self.file_count, 99)
                self.ihm.estado = f'{percent} %'
                time.sleep(0.1)

    def handle_event(self, ev):
        pass
