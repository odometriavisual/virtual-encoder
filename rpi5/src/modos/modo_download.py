import time

from ..ihm.ihm import IHM
from ..download import Downloader
from ..mount_device_manager import MountDeviceManager
from ..pi_zero_client import PiZeroClient
from ..status import EncoderStatus

class ModoDownload:
    def __init__(self, client: PiZeroClient, ihm: IHM, status: EncoderStatus, mount_manager: MountDeviceManager):
        self.client = client
        self.ihm = ihm
        self.status = status
        self.ssd_manager = mount_manager

        self.dowloader = Downloader()

        self.status.set('modo', 'Download')
        self.status.set('estado', 'Inicializando...')

        self.transfered_files = 0

        self.file_count = client.get_file_count()

        if self.file_count == 0:
            self.status.set('estado', 'Nenhum ensaio salvo')
            self.status.add_message('Download: Nenhuma aquisicao salva')
            time.sleep(1)
            self.ihm.send_event(('next_modo', 'Tempo'))
            return

        is_mounted = self.ssd_manager.mount()

        if not is_mounted:
            self.ihm.estado = 'Erro SSD não encontrado'
            self.status.add_message('Download: SSD não encontrado')
            time.sleep(1)
            self.ihm.send_event(('next_modo', 'Tempo'))
            return

        self.client.pause_stream()

        is_downloading = self.dowloader.start()
        self.status.add_message('Download: Iniciando...')

        if not is_downloading:
            self.status.set('estado', 'Erro no download')
            self.status.add_message('Download: Erro de conexao')
            time.sleep(1)
            self.ihm.send_event(('next_modo', 'Tempo'))
            return

    def stop(self):
        self.client.resume_stream()

    def run(self):
        match status := self.dowloader.get_status():
            case True | False:
                self.dowloader.stop()
                self.ssd_manager.unmount()
                self.status.set('estado', 'Concluida' if status else 'Erro')
                self.ihm.send_event(('next_modo', 'Tempo'))
                self.status.add_message('Download: Finalizado')
                time.sleep(1)

            case line:
                if line.find('.zip') > 0:
                    self.transfered_files += 1
                    self.status.add_message(f'Download: {line}')
                    percent = self.transfered_files / (self.file_count+1)
                    percent = 99.99 if percent >= 100. else 100. * percent
                    self.status.set('estado', f'{percent:.2f} %')
                time.sleep(0.1)

    def handle_event(self, ev):
        pass
