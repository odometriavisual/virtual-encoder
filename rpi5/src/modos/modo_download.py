import time

from ..download import Downloader
from ..encoder_gs import EncoderGS


class ModoDownload:
    def __init__(self, gs: EncoderGS, *, next_modo):
        self.gs = gs
        self.next_modo = next_modo

        self.dowloader = Downloader()

        self.gs.set("modo", "Download")
        self.gs.set("estado", "")

        self.transfered_files = 0
        self.file_count = self.gs.pi_zero_api.get_file_count()

        if self.file_count == 0:
            self.gs.set("estado", "Nenhum ensaio salvo")
            self.gs.add_message("Download: Nenhuma aquisicao salva")
            time.sleep(1)
            self.gs.send_event(("set_modo", next_modo))
            return

        is_mounted = self.gs.ssd_manager.mount()

        if not is_mounted:
            self.gs.estado = "ERRO: SSD não encontrado"
            self.gs.add_message("ERRO: SSD não encontrado")
            time.sleep(1)
            self.gs.send_event(("set_modo", next_modo))
            return

        self.gs.pi_zero_api.pause_stream()

        is_downloading = self.dowloader.start()
        self.gs.add_message("Download: Iniciando...")

        if not is_downloading:
            self.gs.set("estado", "Erro no download")
            self.gs.add_message("ERRO: Erro de conexao")
            time.sleep(1)
            self.gs.send_event(("set_modo", next_modo))
            return

    def stop(self):
        pass

    def run(self):
        match status := self.dowloader.get_status():
            case True | False:
                self.dowloader.stop()
                self.gs.ssd_manager.unmount()
                self.gs.set("estado", "Concluida" if status else "Erro")
                self.gs.send_event(("set_modo", self.next_modo))
                self.gs.add_message("Download: Finalizado")
                time.sleep(1)

            case line:
                if line.find(".zip") > 0:
                    self.transfered_files += 1
                    self.gs.add_message(f"Download: {line}")
                    self.gs.set("estado", f"{self.transfered_files}/{self.file_count}")
                time.sleep(0.1)

    def handle_event(self, ev):
        pass
