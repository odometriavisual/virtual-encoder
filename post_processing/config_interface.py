import tkinter as tk
from PIL import Image, ImageTk
import os
import sys
import glob
import cv2
import numpy as np
from processing.displacement_processor import load_img_grayscale


def show_config_interface(config, folder_path):
    config.setdefault("Image Processing", {
        "apply_clahe": True,
        "apply_denoise": True
    })

    # Busca por diferentes extensões de imagem
    image_extensions = ["*.jpg", "*.jpeg", "*.png", "*.bmp", "*.tiff"]
    image_files = []

    for ext in image_extensions:
        image_files.extend(glob.glob(os.path.join(folder_path, ext)))
        image_files.extend(glob.glob(os.path.join(folder_path, ext.upper())))

    image_files = sorted(image_files)

    if not image_files:
        print(f"Nenhuma imagem encontrada na pasta: {folder_path}")
        print(f"Arquivos na pasta: {os.listdir(folder_path) if os.path.exists(folder_path) else 'Pasta não existe'}")
        return config

    img_path = image_files[0]
    print(f"Usando imagem: {img_path}")

    # Cria a janela principal
    root = tk.Tk()
    root.title("Configuração do Visual Odometer")
    root.geometry("1300x800")  # Janela ainda maior
    root.minsize(1200, 700)  # Tamanho mínimo

    # IMPORTANTE: Força a atualização da janela antes de criar imagens
    root.update()

    # Variáveis para armazenar as referências das imagens
    original_photo = None
    processed_photo = None

    # Widgets de texto
    tk.Label(root, text="Imagem Original", font=("Arial", 12, "bold")).grid(row=0, column=0, padx=10, pady=5)
    tk.Label(root, text="Imagem Processada", font=("Arial", 12, "bold")).grid(row=0, column=1, padx=10, pady=5)

    # Variáveis dos checkboxes
    clahe_var = tk.BooleanVar(master=root, value=config["Image Processing"]["apply_clahe"])
    denoise_var = tk.BooleanVar(master=root, value=config["Image Processing"]["apply_denoise"])

    # Labels para as imagens - removendo width e height para permitir redimensionamento
    original_label = tk.Label(root, bg="lightgray", text="Carregando...", relief="sunken", bd=2)
    original_label.grid(row=1, column=0, padx=10, pady=5, sticky="nsew")

    processed_label = tk.Label(root, bg="lightgray", text="Carregando...", relief="sunken", bd=2)
    processed_label.grid(row=1, column=1, padx=10, pady=5, sticky="nsew")

    # Configura o grid para expandir
    root.grid_columnconfigure(0, weight=1)
    root.grid_columnconfigure(1, weight=1)
    root.grid_rowconfigure(1, weight=1)

    def load_original_image():
        nonlocal original_photo
        try:
            print(f"Carregando imagem: {img_path}")
            print(f"Arquivo existe: {os.path.exists(img_path)}")

            # Primeiro, tenta carregar com OpenCV para verificar se a imagem é válida
            cv_img = cv2.imread(img_path)
            if cv_img is None:
                print("OpenCV não conseguiu carregar a imagem")
                original_label.config(text="Arquivo de imagem\ninválido")
                return False

            print(f"OpenCV carregou imagem: {cv_img.shape}")

            # Converte BGR para RGB
            cv_img_rgb = cv2.cvtColor(cv_img, cv2.COLOR_BGR2RGB)

            # Redimensiona para um tamanho fixo maior
            target_width = 600
            target_height = 450

            cv_img_resized = cv2.resize(cv_img_rgb, (target_width, target_height))

            # Converte para PIL
            pil_img = Image.fromarray(cv_img_resized)

            # IMPORTANTE: Cria PhotoImage explicitamente com master=root
            original_photo = ImageTk.PhotoImage(image=pil_img, master=root)

            # Atualiza o label
            original_label.config(image=original_photo, text="")
            original_label.image = original_photo  # Mantém referência dupla

            print(f"Imagem original carregada com sucesso: {target_width}x{target_height}")
            return True

        except Exception as e:
            print(f"Erro ao carregar imagem original: {e}")
            import traceback
            traceback.print_exc()
            original_label.config(text=f"Erro ao carregar\nimagem:\n{str(e)[:30]}...")
            return False

    def update_preview():
        nonlocal processed_photo
        print("Update_Preview")
        try:
            apply_clahe = clahe_var.get()
            apply_denoise = denoise_var.get()

            print(f"Processando imagem com CLAHE: {apply_clahe}, Denoise: {apply_denoise}")

            # Carrega e processa a imagem
            img_proc = load_img_grayscale(img_path, apply_clahe, apply_denoise)

            # Verifica se a imagem foi processada corretamente
            if img_proc is None:
                processed_label.config(text="Erro: Imagem\nnão processada")
                return

            print(f"Imagem processada shape: {img_proc.shape}, dtype: {img_proc.dtype}")

            # Converte para RGB se necessário
            if len(img_proc.shape) == 2:  # Se for grayscale
                img_proc_rgb = cv2.cvtColor(img_proc, cv2.COLOR_GRAY2RGB)
            else:
                img_proc_rgb = img_proc

            # Garante que os valores estão no range correto
            if img_proc_rgb.dtype == np.float64 or img_proc_rgb.dtype == np.float32:
                img_proc_rgb = (img_proc_rgb * 255).astype(np.uint8)
            elif img_proc_rgb.dtype != np.uint8:
                img_proc_rgb = img_proc_rgb.astype(np.uint8)

            # Redimensiona para o mesmo tamanho da imagem original
            target_width = 600
            target_height = 450

            img_resized = cv2.resize(img_proc_rgb, (target_width, target_height))

            # Converte para PIL
            pil_img = Image.fromarray(img_resized)

            # IMPORTANTE: Cria PhotoImage explicitamente com master=root
            processed_photo = ImageTk.PhotoImage(image=pil_img, master=root)

            # Atualiza o label
            processed_label.config(image=processed_photo, text="")
            processed_label.update_idletasks()
            processed_label.image = processed_photo  # Mantém referência dupla

            print("Imagem processada atualizada com sucesso")

        except Exception as e:
            print(f"Erro ao processar imagem: {e}")
            import traceback
            traceback.print_exc()
            processed_label.config(text=f"Erro ao processar:\n{str(e)[:30]}...")
            processed_label.update_idletasks()

    def apply_and_close():
        config["Image Processing"]["apply_clahe"] = clahe_var.get()
        config["Image Processing"]["apply_denoise"] = denoise_var.get()
        print(f"Configuração salva: CLAHE={clahe_var.get()}, Denoise={denoise_var.get()}")
        root.quit()
        root.destroy()

    def on_closing():
        print("Fechando interface...")
        sys.exit(0)
        root.quit()
        root.destroy()

    # Frame para os controles
    control_frame = tk.Frame(root)
    control_frame.grid(row=2, column=0, columnspan=2, pady=20)

    # Checkboxes com comando mais explícito
    def on_checkbox_change():
        print(f"clahe_var atualizado: {clahe_var.get()}, id: {id(clahe_var)}")
        update_preview()

    print(f"clahe_var inicial: {clahe_var.get()}, id: {id(clahe_var)}")
    tk.Checkbutton(control_frame, text="Aplicar CLAHE (Contrast Limited Adaptive Histogram Equalization)",
                   variable=clahe_var, command=on_checkbox_change, font=("Arial", 11)).pack(anchor='w', pady=8)
    tk.Checkbutton(control_frame, text="Aplicar Denoise (Redução de Ruído)",
                   variable=denoise_var, command=on_checkbox_change, font=("Arial", 11)).pack(anchor='w', pady=8)

    # Botão
    button_frame = tk.Frame(root)
    button_frame.grid(row=3, column=0, columnspan=2, pady=20)

    tk.Button(button_frame, text="Aplicar e Continuar", command=apply_and_close,
              bg="lightblue", font=("Arial", 12, "bold"), padx=30, pady=10).pack()

    # Configura o fechamento da janela
    root.protocol("WM_DELETE_WINDOW", on_closing)

    # Força a atualização da interface antes de carregar imagens
    root.update_idletasks()
    root.update()

    # Carrega as imagens após a interface estar pronta
    def initialize_images():
        print("Inicializando imagens...")
        # Força outra atualização antes de criar as imagens
        root.update()

        if load_original_image():
            # Pequena pausa antes de processar
            root.after(100, update_preview)
        else:
            print("Falha ao carregar imagem original")

    # Agenda a inicialização das imagens com mais tempo
    initialize_images()

    # Centraliza a janela
    root.update_idletasks()
    width = root.winfo_reqwidth()
    height = root.winfo_reqheight()
    x = (root.winfo_screenwidth() // 2) - (width // 2)
    y = (root.winfo_screenheight() // 2) - (height // 2)
    root.geometry(f'{width}x{height}+{x}+{y}')

    print("Iniciando mainloop...")
    root.mainloop()

    return config