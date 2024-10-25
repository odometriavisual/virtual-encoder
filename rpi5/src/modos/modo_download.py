import time

from ..ihm.ihm import IHM
from ..ihm.download import Downloader
from ..pi_zero_client import PiZeroClient

class ModoDownload:
    def __init__(self, client: PiZeroClient, ihm: IHM):
        self.client = client

        self.ihm = ihm
        self.dowloader = Downloader()

        self.ihm.modo = 'Download'
        self.ihm.estado = 'Inicializando...'

        self.transfered_files = 0

        if not self.dowloader.start():
            self.ihm.estado = 'Erro'
            self.ihm.send_event(('next_modo', 'Tempo'))
            time.sleep(5)
        else:
            self.client.disable_streaming()

    def run(self):
        status = self.dowloader.get_status()
        match status:
            case True | False:
                self.dowloader.stop()
                self.ihm.estado = 'Concluida' if status else 'Erro'
                self.ihm.send_event(('next_modo', 'Tempo'))
                self.client.enable_streaming()
                time.sleep(5)

            case line:
                self.transfered_files += 1
                self.ihm.estado = f'{self.transfered_files} arquivos baixados'
                time.sleep(0.1)

    def handle_event(self, ev):
        pass
