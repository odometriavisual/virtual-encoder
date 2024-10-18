from ..ihm.ihm import IHM
from ..pi_zero_client import PiZeroClient
from ..ihm.download import Downloader

from ..estados import *

class ModoTransferencia:
    def __init__(self, ihm: IHM):
        self.ihm = ihm
        self.dowloader = Downloader()

        self.ihm.modo = 'Tranferencia'
        self.ihm.estado = '0 arquivos transferidos'

        self.dowloader.iniciar_download()

    def run(self):
        match self.dowloader.poll_process():
            case False:
                self.dowloader.finish_download()
                self.ihm.estado = 'Concluida'
                self.ihm.send_event(('next_modo', 'Tempo'))

            case True:
                self.dowloader.finish_download()
                self.ihm.estado = 'Erro'
                self.ihm.send_event(('next_modo', 'Tempo'))

            case lines:
                self.ihm.estado = f'{lines} arquivos transferidos'

    def handle_event(self, ev):
        pass
