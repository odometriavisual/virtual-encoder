from tkinter import Tk, filedialog

def select_folder():
    """Abre seletor de pasta para imagens e encerra se não for escolhida."""
    Tk().withdraw()
    folder = filedialog.askdirectory(title="Selecione a pasta de imagens")
    if not folder:
        print("Nenhuma pasta selecionada.")
        return None  # Encerra o programa com sucesso
    return folder

def select_ensaio():
    Tk().withdraw()
    return filedialog.askopenfilename(filetypes=[("ensaio", "*.zip")], initialdir="/home/fernando/Documents/encoder/ensaios/2025.10.13 Calibracao de distancia v3")

def get_config_label(config: dict) -> str:
    disp_config = config["Displacement Estimation"]
    method = disp_config["method"]
    reprocess = "reprocess" if disp_config["reprocess_displacement"] else "noreprocess"
    skip = "skip" if disp_config["skip_frames"] else "noskip"
    threshold = disp_config["params"].get("skip_frames_threshold", "na")
    return f"{method}_{reprocess}_{skip}_{threshold}"
