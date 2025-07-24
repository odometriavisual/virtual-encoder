import time

from ..download import Downloader
from ..encoder_gs import EncoderGS


class ModoDownload:
    def __init__(self, gs: EncoderGS):
        self.gs = gs

        self.dowloader = Downloader()

        self.gs.set("modo", "Download")
        self.gs.set("estado", "Inicializando...")

        self.transfered_files = 0
        self.file_count = self.gs.client.get_file_count()
        self.stream_was_enabled = self.gs.client.stream_enabled

        if self.file_count == 0:
            self.gs.set("estado", "Nenhum ensaio salvo")
            self.gs.add_message("Download: Nenhuma aquisicao salva")
            time.sleep(1)
            self.gs.send_event(("next_modo", "Tempo"))
            return

        is_mounted = self.gs.ssd_manager.mount()

        if not is_mounted:
            self.gs.estado = "ERRO: SSD não encontrado"
            self.gs.add_message("ERRO: SSD não encontrado")
            time.sleep(1)
            self.gs.send_event(("next_modo", "Tempo"))
            return

        self.gs.client.pause_stream()

        is_downloading = self.dowloader.start()
        self.gs.add_message("Download: Iniciando...")

        if not is_downloading:
            self.gs.set("estado", "Erro no download")
            self.gs.add_message("ERRO: Erro de conexao")
            time.sleep(1)
            self.gs.send_event(("next_modo", "Tempo"))
            return

    def stop(self):
        if self.stream_was_enabled:
            self.gs.client.resume_stream()

    def run(self):
        match status := self.dowloader.get_status():
            case True | False:
                self.dowloader.stop()
                self.gs.ssd_manager.unmount()
                self.gs.set("estado", "Concluida" if status else "Erro")
                self.gs.send_event(("next_modo", "Tempo"))
                self.gs.add_message("Download: Finalizado")
                time.sleep(1)

            case line:
                if line.find(".zip") > 0:
                    self.transfered_files += 1
                    self.gs.add_message(f"Download: {line}")
                    percent = self.transfered_files / (self.file_count + 1)
                    percent = 99.99 if percent >= 100.0 else 100.0 * percent
                    self.gs.set("estado", f"{percent:.2f} %")
                time.sleep(0.1)

    def handle_event(self, ev):
        pass
