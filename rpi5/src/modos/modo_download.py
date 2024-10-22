import time

from ..ihm.ihm import IHM
from ..ihm.download import Downloader

class ModoDownload:
    def __init__(self, ihm: IHM):
        self.ihm = ihm
        self.dowloader = Downloader()

        self.ihm.modo = 'Tranferencia'
        self.ihm.estado = '0 arquivos transferidos'

        self.dowloader.start()

    def run(self):
        match self.dowloader.get_status():
            case False:
                self.dowloader.stop()
                self.ihm.estado = 'Concluida'
                self.ihm.send_event(('next_modo', 'Tempo'))
                time.sleep(5)

            case True:
                self.dowloader.stop()
                self.ihm.estado = 'Erro'
                self.ihm.send_event(('next_modo', 'Tempo'))
                time.sleep(5)

            case lines:
                self.ihm.estado = f'{lines} arquivos transferidos'
                time.sleep(0.1)

    def handle_event(self, ev):
        pass
