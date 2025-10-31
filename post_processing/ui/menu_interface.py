# menu_interface.py
import tkinter as tk
from tkinter import messagebox, filedialog, ttk
import os
import subprocess
import sys
import numpy as np
import glob
from tools.video_overlay import create_side_by_side_video
from tools.plot_2d import plot2DFromData
from tools.plot_3d import plot3DFromData
from processing.displacement_processor import process_displacements
from ui.config_interface import show_config_interface
from post_processing.utils.file_tools import select_folder, get_config_label
import traceback


class MainMenuInterface:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Visual Odometer - Menu Principal")
        # CORREÇÃO: Aumentei a altura da janela para acomodar todos os botões
        self.root.geometry("600x650")  # Era 600x500, agora é 600x650
        self.root.resizable(True, True)  # Permitir redimensionamento

        # Configurar estilo
        self.root.configure(bg='#f0f0f0')

        # Variáveis
        self.current_folder = None
        self.current_config = dict()

        # CORREÇÃO: Garantir que a configuração tenha a seção 'Image Processing'
        if "Image Processing" not in self.current_config:
            self.current_config["Image Processing"] = {
                "apply_clahe": False,
                "apply_denoise": False
            }

        self.processed_data = None

        self.setup_ui()
        self.center_window()

    def setup_ui(self):
        # Criar frame principal com scroll
        main_canvas = tk.Canvas(self.root, bg='#f0f0f0')
        scrollbar = ttk.Scrollbar(self.root, orient="vertical", command=main_canvas.yview)
        scrollable_frame = tk.Frame(main_canvas, bg='#f0f0f0')

        scrollable_frame.bind(
            "<Configure>",
            lambda e: main_canvas.configure(scrollregion=main_canvas.bbox("all"))
        )

        main_canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        main_canvas.configure(yscrollcommand=scrollbar.set)

        # Pack canvas and scrollbar
        main_canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

        # Título principal
        title_frame = tk.Frame(scrollable_frame, bg='#f0f0f0')
        title_frame.pack(pady=20)

        title_label = tk.Label(
            title_frame,
            text="Visual Odometer",
            font=("Arial", 24, "bold"),
            bg='#f0f0f0',
            fg='#2c3e50'
        )
        title_label.pack()

        subtitle_label = tk.Label(
            title_frame,
            text="Sistema de Odometria Visual",
            font=("Arial", 12),
            bg='#f0f0f0',
            fg='#7f8c8d'
        )
        subtitle_label.pack()

        # Frame para informações da pasta
        info_frame = tk.Frame(scrollable_frame, bg='#f0f0f0')
        info_frame.pack(pady=10, padx=20, fill='x')

        self.folder_label = tk.Label(
            info_frame,
            text="Nenhuma pasta selecionada",
            font=("Arial", 10),
            bg='#f0f0f0',
            fg='#7f8c8d',
            wraplength=500
        )
        self.folder_label.pack()

        # Label de status dos dados
        self.status_label = tk.Label(
            info_frame,
            text="⏳ Dados não processados",
            font=("Arial", 10),
            bg='#f0f0f0',
            fg='#f39c12'
        )
        self.status_label.pack(pady=5)

        # Frame principal para botões
        main_frame = tk.Frame(scrollable_frame, bg='#f0f0f0')
        main_frame.pack(pady=20, padx=40, fill='both')

        config_frame = tk.LabelFrame(
            main_frame,
            text="1. Configuração e Processamento",
            font=("Arial", 12, "bold"),
            bg='#f0f0f0',
            fg='#2c3e50',
            padx=15,
            pady=15
        )
        config_frame.pack(fill='x', pady=(0, 20))

        self.create_button(
            config_frame,
            "📁 Selecionar Pasta de Imagens",
            self.select_folder,
            '#3498db'
        )

        self.create_button(
            config_frame,
            "⚙️ Configurar Parâmetros",
            self.configure_parameters,
            '#9b59b6'
        )

        self.create_button(
            config_frame,
            "🔄 Processar Deslocamentos",
            self.process_data,
            '#e67e22'
        )

        # Seção 2: Visualização
        viz_frame = tk.LabelFrame(
            main_frame,
            text="2. Visualização",
            font=("Arial", 12, "bold"),
            bg='#f0f0f0',
            fg='#2c3e50',
            padx=15,
            pady=15
        )
        viz_frame.pack(fill='x', pady=(0, 20))

        self.create_button(
            viz_frame,
            "📊 Ver Trajetória 2D",
            self.show_2d_plot,
            '#27ae60'
        )

        self.create_button(
            viz_frame,
            "📊 Ver Trajetória 3D",
            self.show_3d_plot,
            '#27ae60'
        )

        # CORREÇÃO: Botão de vídeo com mais destaque
        self.video_button = self.create_button(
            viz_frame,
            "🎬 Ver Vídeo Comparativo",
            self.view_video,
            '#e74c3c'
        )

        # Seção 3: Utilitários
        utils_frame = tk.LabelFrame(
            main_frame,
            text="3. Utilitários",
            font=("Arial", 12, "bold"),
            bg='#f0f0f0',
            fg='#2c3e50',
            padx=15,
            pady=15
        )
        utils_frame.pack(fill='x', pady=(0, 20))

        self.create_button(
            utils_frame,
            "📂 Abrir Pasta de Resultados",
            self.open_results_folder,
            '#34495e'
        )

        self.create_button(
            utils_frame,
            "ℹ️ Sobre o Sistema",
            self.show_about,
            '#95a5a6'
        )

        # Espaço extra no final
        spacer = tk.Frame(scrollable_frame, bg='#f0f0f0', height=50)
        spacer.pack()

        # Bind mouse wheel to canvas
        def _on_mousewheel(event):
            main_canvas.yview_scroll(int(-1 * (event.delta / 120)), "units")

        main_canvas.bind_all("<MouseWheel>", _on_mousewheel)

    def create_button(self, parent, text, command, color):
        """Cria um botão estilizado"""
        btn = tk.Button(
            parent,
            text=text,
            command=command,
            font=("Arial", 11, "bold"),
            bg=color,
            fg='white',
            relief='flat',
            padx=20,
            pady=12,
            cursor='hand2',
            borderwidth=2
        )
        btn.pack(fill='x', pady=5, ipady=2)  # Mais espaçamento vertical

        # Efeito hover melhorado
        def on_enter(e):
            btn.configure(bg=self.darken_color(color), relief='raised')

        def on_leave(e):
            btn.configure(bg=color, relief='flat')

        btn.bind("<Enter>", on_enter)
        btn.bind("<Leave>", on_leave)

        return btn

    def load_existing_data(self):
        """Carrega dados NPZ existentes se disponíveis"""
        if not self.current_folder:
            return None

        data_file = os.path.join(self.current_folder, "displacements_data.npz")
        calibration_file = os.path.join(self.current_folder, "calibration_data.csv")

        px_p_mm = 1.0  # valor padrão caso não tenha calibração
        if os.path.exists(calibration_file):
            try:
                import csv
                with open(calibration_file, 'r') as f:
                    reader = csv.DictReader(f)
                    row = next(reader)
                    px_p_mm = float(row['px_p_mm'])
            except Exception as e:
                print(f"Erro ao ler calibration_data.csv: {e}")

        if os.path.exists(data_file):
            try:
                data = np.load(data_file, allow_pickle=True)
                return {
                    'displacements': data['displacements'],
                    'quaternions': data['quaternions'],
                    'timestamps': data['timestamps'],
                    'image_folder': self.current_folder,
                    'px_p_mm': px_p_mm
                }
            except Exception as e:
                print(f"Erro ao carregar dados existentes: {e}")
                return None

        return None

    def check_data_status(self):
        """Verifica se existem dados processados e atualiza o status"""
        if not self.current_folder:
            return

        data_file = os.path.join(self.current_folder, "displacements_data.npz")

        if os.path.exists(data_file):
            # Contar imagens para verificar se dados estão completos
            image_files = glob.glob(os.path.join(self.current_folder, '*.jpg'))

            try:
                data = np.load(data_file, allow_pickle=True)
                num_processed = len(data['displacements'])
                num_images = len(image_files)

                if num_processed == num_images:
                    status_text = f"✅ Dados processados: {num_processed} imagens"
                    status_color = '#27ae60'
                else:
                    status_text = f"⚠️ Dados incompletos: {num_processed}/{num_images} imagens"
                    status_color = '#f39c12'

                self.status_label.config(text=status_text, fg=status_color)

            except Exception:
                self.status_label.config(text="❌ Erro nos dados processados", fg='#e74c3c')
        else:
            self.status_label.config(text="⏳ Dados não processados", fg='#f39c12')

    def darken_color(self, color):
        """Escurece uma cor para o efeito hover"""
        color_map = {
            '#3498db': '#2980b9',
            '#9b59b6': '#8e44ad',
            '#e67e22': '#d35400',
            '#27ae60': '#229954',
            '#e74c3c': '#c0392b',
            '#f39c12': '#e67e22',
            '#34495e': '#2c3e50',
            '#95a5a6': '#7f8c8d'
        }
        return color_map.get(color, color)

    def center_window(self):
        """Centraliza a janela na tela"""
        self.root.update_idletasks()
        width = self.root.winfo_width()
        height = self.root.winfo_height()
        x = (self.root.winfo_screenwidth() // 2) - (width // 2)
        y = (self.root.winfo_screenheight() // 2) - (height // 2)
        self.root.geometry(f'{width}x{height}+{x}+{y}')

    def select_folder(self):
        """Seleciona a pasta de imagens"""
        try:
            folder = select_folder()
            if folder:
                self.current_folder = folder
                self.folder_label.config(
                    text=f"📁 Pasta selecionada: {os.path.basename(folder)}",
                    fg='#27ae60',
                    font=("Arial", 10, "bold")
                )

                # Verificar status dos dados
                self.check_data_status()

                # Tentar carregar dados existentes
                existing_data = self.load_existing_data()
                if existing_data:
                    self.processed_data = existing_data

                #messagebox.showinfo("Sucesso", f"Pasta selecionada:\n{folder}")
        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao selecionar pasta:\n{str(e)}")

    def configure_parameters(self):
        """Abre a interface de configuração"""
        if not self.current_folder:
            messagebox.showwarning("Aviso", "Selecione uma pasta de imagens primeiro!")
            return

        try:
            self.current_config = show_config_interface(self.current_config, self.current_folder)
            #messagebox.showinfo("Sucesso", "Configuração atualizada com sucesso!")
        except Exception as e:
            messagebox.showerror("Erro", f"Erro na configuração:\n{str(e)}")

    def process_data(self):
        """Processa os deslocamentos"""
        if not self.current_folder:
            messagebox.showwarning("Aviso", "Selecione uma pasta de imagens primeiro!")
            return

        # Verificar se arquivo IMU existe
        imu_file = os.path.join(self.current_folder, "imu.csv")
        if not os.path.exists(imu_file):
            messagebox.showerror("Erro", f"Arquivo IMU não encontrado:\n{imu_file}")
            return

        # Contar imagens
        image_files = glob.glob(os.path.join(self.current_folder, '*.jpg'))
        if not image_files:
            messagebox.showerror("Erro", "Nenhuma imagem JPG encontrada na pasta!")
            return

        total_images = len(image_files)

        try:
            # Janela de progresso mais avançada
            progress_window = tk.Toplevel(self.root)
            progress_window.title("Processando Imagens...")
            progress_window.geometry("450x150")
            progress_window.resizable(False, False)
            progress_window.transient(self.root)
            progress_window.grab_set()

            # Centralizar janela de progresso
            x = self.root.winfo_x() + 75
            y = self.root.winfo_y() + 200
            progress_window.geometry(f"450x150+{x}+{y}")

            # Labels de progresso
            main_label = tk.Label(
                progress_window,
                text="Processando deslocamentos...",
                font=("Arial", 12, "bold")
            )
            main_label.pack(pady=10)

            progress_label = tk.Label(
                progress_window,
                text="Preparando...",
                font=("Arial", 10)
            )
            progress_label.pack(pady=5)

            # Barra de progresso
            progress_bar = ttk.Progressbar(
                progress_window,
                length=350,
                mode='determinate',
                maximum=total_images
            )
            progress_bar.pack(pady=10)

            percent_label = tk.Label(
                progress_window,
                text="0%",
                font=("Arial", 10)
            )
            percent_label.pack()

            progress_window.update()

            # Função de callback para atualizar progresso
            def update_progress(current, total, current_file=""):
                progress_bar['value'] = current
                percent = int((current / total) * 100)
                progress_label.config(text=f"Imagem {current}/{total}: {os.path.basename(current_file)}")
                percent_label.config(text=f"{percent}%")
                progress_window.update()

            # Processar dados com callback de progresso
            self.processed_data = self.process_displacements_with_progress(
                self.current_folder,
                self.current_config,
                update_progress,
                force_reprocessing=True
            )

            progress_window.destroy()

            # Atualizar status
            self.check_data_status()

            #messagebox.showinfo("Sucesso", f"Processamento concluído!\n{total_images} imagens processadas.")

        except Exception as e:
            if 'progress_window' in locals():
                progress_window.destroy()
            print(e)
            traceback.print_exc()
            messagebox.showerror("Erro", f"Erro no processamento:\n{str(e)}")

    def process_displacements_with_progress(self, image_folder, config, progress_callback, force_reprocessing=False):
        """Versão modificada do process_displacements com callback de progresso"""
        from visual_odometer import VisualOdometer
        from processing.displacement_processor import load_img_grayscale
        from post_processing.utils.img_tools import extract_timestamp_from_txt
        from post_processing.utils.imu_tools import load_imu_data, find_closest_imu_data

        data_file = os.path.join(image_folder, "displacements_data.npz")

        # Tentar carregar dados existentes (caso não seja forçado)
        if os.path.exists(data_file) and not force_reprocessing:
            data = np.load(data_file, allow_pickle=True)

            # Leitura do px_p_mm mesmo se não for necessário reprocesar
            calibration_file = os.path.join(image_folder, "calibration_data.csv")
            px_p_mm = 1.0
            if os.path.exists(calibration_file):
                try:
                    import csv
                    with open(calibration_file, 'r') as f:
                        reader = csv.DictReader(f)
                        row = next(reader)
                        px_p_mm = float(row['px_p_mm'])
                except Exception as e:
                    print(f"Erro ao ler calibration_data.csv: {e}")

            return {
                'displacements': data['displacements'],
                'quaternions': data['quaternions'],
                'timestamps': data['timestamps'],
                'image_folder': image_folder,
                'px_p_mm': px_p_mm
            }

        # Carregar IMU
        imu_file = os.path.join(image_folder, "imu.csv")
        imu_data = load_imu_data(imu_file)
        image_files = sorted(glob.glob(os.path.join(image_folder, '*.jpg')))

        # Leitura do calibration_data.csv
        calibration_file = os.path.join(image_folder, "calibration_data.csv")
        px_p_mm = 1.0
        if os.path.exists(calibration_file):
            try:
                import csv
                with open(calibration_file, 'r') as f:
                    reader = csv.DictReader(f)
                    row = next(reader)
                    px_p_mm = float(row['px_p_mm'])
            except Exception as e:
                print(f"Erro ao ler calibration_data.csv: {e}")

        # Inicializar odômetro
        odometer = VisualOdometer((240, 320), async_mode=False)
        odometer.configs = config
        displacements, quaternions, timestamps = [], [], []

        for i, img_file in enumerate(image_files):
            progress_callback(i + 1, len(image_files), img_file)

            img_timestamp = extract_timestamp_from_txt(img_file)
            quaternion = find_closest_imu_data(imu_data, img_timestamp)
            q_array = [quaternion['qw'], quaternion['qx'], quaternion['qy'], quaternion['qz']]

            # Aplicar configurações de pré-processamento
            apply_clahe = config.get("Image Processing", {}).get("apply_clahe", False)
            apply_denoise = config.get("Image Processing", {}).get("apply_denoise", False)

            img_processed = load_img_grayscale(img_file, apply_clahe, apply_denoise)
            odometer.feed_image(img_processed)

            dx, dy = odometer.get_displacement()
            displacements.append([dx, dy])
            quaternions.append(q_array)
            timestamps.append(img_timestamp)

        displacements = np.array(displacements)
        quaternions = np.array(quaternions)
        timestamps = np.array(timestamps)

        # Salvar dados
        np.savez(data_file,
                 displacements=displacements,
                 quaternions=quaternions,
                 timestamps=timestamps)

        return {
            'displacements': displacements,
            'quaternions': quaternions,
            'timestamps': timestamps,
            'image_folder': image_folder,
            'px_p_mm': px_p_mm
        }

    def show_2d_plot(self):
        """Mostra o gráfico 2D da trajetória"""
        if not self.current_folder:
            messagebox.showwarning("Aviso", "Selecione uma pasta de imagens primeiro!")
            return

        # Tentar carregar dados existentes se não estiverem em memória
        if not self.processed_data:
            self.processed_data = self.load_existing_data()

        if not self.processed_data:
            if messagebox.askyesno("Dados não encontrados",
                                   "Nenhum dado processado encontrado.\n\nDeseja processar os dados agora?"):
                self.process_data()
                if not self.processed_data:
                    return
            else:
                return

        try:
            plot2DFromData(self.processed_data["displacements"], self.processed_data.get("px_p_mm", 1.0))
        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao gerar gráfico 2D:\n{str(e)}")

    def show_3d_plot(self):
        """Mostra o gráfico 2D da trajetória"""
        if not self.current_folder:
            messagebox.showwarning("Aviso", "Selecione uma pasta de imagens primeiro!")
            return

        # Tentar carregar dados existentes se não estiverem em memória
        if not self.processed_data:
            self.processed_data = self.load_existing_data()

        if not self.processed_data:
            if messagebox.askyesno("Dados não encontrados",
                                   "Nenhum dado processado encontrado.\n\nDeseja processar os dados agora?"):
                self.process_data()
                if not self.processed_data:
                    return
            else:
                return

        try:
            plot3DFromData(self.processed_data["displacements"],self.processed_data["quaternions"],self.processed_data.get("px_p_mm", 1.0))

        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao gerar gráfico 3D:\n{str(e)}")


    def view_video(self):
        """Ver vídeo - cria se não existir, abre se já existir"""
        print("DEBUG: Função view_video chamada!")  # Debug

        if not self.current_folder:
            return  # Sai silenciosamente se não houver pasta selecionada

        video_path = os.path.join(self.current_folder, "comparacao_lado_a_lado2.mp4")

        # Se o vídeo já existe, abre diretamente
        if os.path.exists(video_path):
            self.open_existing_video(video_path)
            return

        # Se não existe, cria o vídeo
        try:
            # Janela de progresso
            progress_window = tk.Toplevel(self.root)
            progress_window.title("Processando Vídeo...")
            progress_window.geometry("400x120")
            progress_window.resizable(False, False)
            progress_window.transient(self.root)
            progress_window.grab_set()

            x = self.root.winfo_x() + 100
            y = self.root.winfo_y() + 200
            progress_window.geometry(f"400x120+{x}+{y}")

            progress_label = tk.Label(
                progress_window,
                text="Criando vídeo comparativo...\nIsso pode levar alguns minutos.",
                font=("Arial", 11),
                justify='center'
            )
            progress_label.pack(pady=25)

            progress_window.update()

            # Criar o vídeo
            create_side_by_side_video(self.current_folder)

            progress_window.destroy()

            # Abre o vídeo automaticamente após criação
            self.open_existing_video(video_path)

        except Exception as e:
            if 'progress_window' in locals():
                progress_window.destroy()
            # Você pode escolher se quer manter esta messagebox de erro ou não
            messagebox.showerror("Erro", f"Erro ao criar vídeo:\n{str(e)}")


    def open_existing_video(self, video_path):
        """Abre um vídeo existente"""
        try:
            if sys.platform.startswith('win'):
                os.startfile(video_path)
            elif sys.platform.startswith('darwin'):
                subprocess.run(['open', video_path])
            else:
                subprocess.run(['xdg-open', video_path])

            #messagebox.showinfo("Sucesso", "Vídeo aberto com sucesso!")

        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao abrir vídeo:\n{str(e)}")

    def open_results_folder(self):
        """Abre a pasta de resultados"""
        if not self.current_folder:
            messagebox.showwarning("Aviso", "Selecione uma pasta de imagens primeiro!")
            return

        try:
            if sys.platform.startswith('win'):
                os.startfile(self.current_folder)
            elif sys.platform.startswith('darwin'):
                subprocess.run(['open', self.current_folder])
            else:
                subprocess.run(['xdg-open', self.current_folder])

        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao abrir pasta:\n{str(e)}")

    def show_about(self):
        """Mostra informações sobre o programa"""
        about_text = """Visual Odometer v1.0

    Sistema de Odometria Visual para análise 
    de trajetórias baseado em sequências de imagens.

    Funcionalidades:
    • Processamento de deslocamentos
    • Visualização de trajetórias 2D
    • Geração de vídeos comparativos
    • Interface intuitiva de configuração

    Desenvolvido com Python, OpenCV e Tkinter.

    Todas as seções estão funcionando corretamente:
    ✅ Configuração e Processamento
    ✅ Visualização (incluindo vídeo)
    ✅ Utilitários"""

        #messagebox.showinfo("Sobre o Sistema", about_text)

    def run(self):
        """Executa a interface"""
        self.root.mainloop()


def show_main_menu():
    """Função para mostrar o menu principal"""
    app = MainMenuInterface()
    app.run()


if __name__ == "__main__":
    show_main_menu()
