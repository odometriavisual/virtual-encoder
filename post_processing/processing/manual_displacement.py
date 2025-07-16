import cv2
import os
import numpy as np
from tkinter import filedialog, Tk

ALPHA = 2  # Contraste mais forte
BETA = 25  # Brilho extra

SCALE = 2  # Escala para exibição
GRID_SPACING = 300


class ManualDisplacementEstimator:
    def __init__(self):
        self.image_paths = []
        self.current_index = 0
        self.left_point = None
        self.right_point = None
        self.displacements = []
        self.original_size = None  # Para armazenar o tamanho original
        self.select_folder()

        if self.image_paths:
            self.run()

    def select_folder(self):
        root = Tk()
        root.withdraw()
        folder = filedialog.askdirectory(title='Selecione a pasta com imagens')
        if not folder:
            print("Nenhuma pasta selecionada.")
            return

        self.image_paths = sorted([
            os.path.join(folder, f) for f in os.listdir(folder)
            if f.lower().endswith(('.jpg', '.jpeg', '.png'))
        ])
        self.folder = folder

    def run(self):
        previous_right_point = None

        while self.current_index + 1 < len(self.image_paths):
            # Carrega imagens originais (frame atual e próximo)
            left_original = cv2.imread(self.image_paths[self.current_index])
            right_original = cv2.imread(self.image_paths[self.current_index + 1])

            # Armazena tamanho original na primeira iteração
            if self.original_size is None:
                self.original_size = (left_original.shape[1], left_original.shape[0])  # (width, height)
                print(f"📐 Tamanho original das imagens: {self.original_size[0]}x{self.original_size[1]}")
                print(f"📁 Total de {len(self.image_paths)} imagens para processar")
                print(f"🔄 Serão feitas {len(self.image_paths) - 1} comparações frame-a-frame")

            # Aplica melhorias
            self.left_image = self.enhance_image(left_original)
            self.right_image = self.enhance_image(right_original)

            # Prepara para exibição (com escala e grade)
            self.left_display = self.prepare_image(self.left_image.copy())
            self.right_display = self.prepare_image(self.right_image.copy())

            # Se havia um ponto anterior à direita, converte para coordenadas da nova escala
            if previous_right_point:
                # previous_right_point já está em coordenadas originais, precisa escalar para display
                self.left_point = (int(previous_right_point[0] * SCALE), int(previous_right_point[1] * SCALE))
                self.left_display = self.draw_marker(self.left_display, self.left_point)
                print(
                    f"🔄 Reutilizando ponto anterior: {previous_right_point} (original) -> {self.left_point} (display)")
            else:
                self.left_point = None

            self.right_point = None

            cv2.namedWindow("Frame Atual")
            cv2.setMouseCallback("Frame Atual", self.mouse_callback_left)
            cv2.namedWindow("Próximo Frame")
            cv2.setMouseCallback("Próximo Frame", self.mouse_callback_right)

            print(
                f"\n📷 Frame {self.current_index + 1}/{len(self.image_paths)} -> Frame {self.current_index + 2}/{len(self.image_paths)}")
            print("💡 Clique nos pontos correspondentes. Pressione 'c' para confirmar ou 'q' para sair")

            while True:
                # Cria displays atualizados com informações
                current_left_display = self.left_display.copy()
                current_right_display = self.right_display.copy()

                # Adiciona informações sobre progresso
                progress_text = f"Progresso: {self.current_index + 1}/{len(self.image_paths) - 1}"
                cv2.putText(current_left_display, progress_text,
                            (10, current_left_display.shape[0] - 40), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

                # Adiciona informações sobre os pontos e deslocamento
                if self.left_point and self.right_point:
                    # Converte pontos do display para coordenadas originais
                    left_orig = (int(self.left_point[0] / SCALE), int(self.left_point[1] / SCALE))
                    right_orig = (int(self.right_point[0] / SCALE), int(self.right_point[1] / SCALE))

                    # Calcula deslocamento em pixels originais
                    dx = right_orig[0] - left_orig[0]
                    dy = right_orig[1] - left_orig[1]

                    # Adiciona texto com informações
                    info_text = f"Deslocamento: ({dx:+d}, {dy:+d}) px"
                    cv2.putText(current_left_display, f"P1: {left_orig}",
                                (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                    cv2.putText(current_right_display, f"P2: {right_orig}",
                                (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                    cv2.putText(current_right_display, info_text,
                                (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 0), 2)

                    # Mostra apenas uma vez por seleção (evita spam no console)
                    if not hasattr(self, '_last_displacement') or self._last_displacement != (dx, dy):
                        print(f"📍 Pontos selecionados - P1: {left_orig}, P2: {right_orig}")
                        print(f"📐 Deslocamento calculado: ({dx:+d}, {dy:+d}) pixels")
                        self._last_displacement = (dx, dy)

                cv2.imshow("Frame Atual", current_left_display)
                cv2.imshow("Próximo Frame", current_right_display)
                key = cv2.waitKey(1) & 0xFF

                if key == ord('q'):
                    cv2.destroyAllWindows()
                    self.save_displacements()
                    return

                elif key == ord('c') and self.left_point and self.right_point:
                    # Converte pontos para coordenadas originais
                    left_orig = (int(self.left_point[0] / SCALE), int(self.left_point[1] / SCALE))
                    right_orig = (int(self.right_point[0] / SCALE), int(self.right_point[1] / SCALE))

                    dx = right_orig[0] - left_orig[0]
                    dy = right_orig[1] - left_orig[1]

                    self.displacements.append({
                        'from': self.image_paths[self.current_index],
                        'to': self.image_paths[self.current_index + 1],
                        'displacement': (dx, dy),
                        'point1': left_orig,
                        'point2': right_orig
                    })

                    print(f"✅ Deslocamento {len(self.displacements)} confirmado: ({dx:+d}, {dy:+d}) px")

                    # Armazena ponto direito em coordenadas originais para próxima iteração
                    previous_right_point = right_orig

                    self.current_index += 1

                    # Reset do último deslocamento para evitar confusão
                    if hasattr(self, '_last_displacement'):
                        delattr(self, '_last_displacement')

                    break

        cv2.destroyAllWindows()
        self.save_displacements()

    def enhance_image(self, img):
        # Aplica CLAHE no canal V do HSV (preserva cor)
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        hsv[:, :, 2] = clahe.apply(hsv[:, :, 2])
        enhanced = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

        # Aplica filtro bilateral (suaviza fundo, preserva bordas)
        filtered = cv2.bilateralFilter(enhanced, d=9, sigmaColor=75, sigmaSpace=75)

        return filtered

    def prepare_image(self, img):
        # Escala para exibição
        img_scaled = cv2.resize(img, (img.shape[1] * SCALE, img.shape[0] * SCALE), interpolation=cv2.INTER_NEAREST)

        # Adiciona grade
        overlay = img_scaled.copy()
        for x in range(0, img_scaled.shape[1], GRID_SPACING):
            cv2.line(overlay, (x, 0), (x, img_scaled.shape[0]), (255, 255, 255), 1)
        for y in range(0, img_scaled.shape[0], GRID_SPACING):
            cv2.line(overlay, (0, y), (img_scaled.shape[1], y), (255, 255, 255), 1)

        # Mistura grade com imagem
        result = cv2.addWeighted(overlay, 0.2, img_scaled, 0.8, 0)

        # Adiciona informação do tamanho original no canto
        if self.original_size:
            size_text = f"Original: {self.original_size[0]}x{self.original_size[1]}"
            cv2.putText(result, size_text, (10, result.shape[0] - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

        return result

    def draw_marker(self, image, point):
        if point is None:
            return image
        color = (0, 255, 0)
        thickness = 2
        side = 15
        x, y = point

        marked = image.copy()

        # Desenha cruz
        cv2.line(marked, (x - side, y), (x + side, y), color, thickness)
        cv2.line(marked, (x, y - side), (x, y + side), color, thickness)

        # Círculo central
        cv2.circle(marked, (x, y), 3, color, -1)

        # Coordenadas originais para display
        orig_x, orig_y = int(x / SCALE), int(y / SCALE)
        cv2.putText(marked, f"({orig_x}, {orig_y})", (x + 20, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1)

        return marked

    def mouse_callback_left(self, event, x, y, flags, param):
        if event == cv2.EVENT_LBUTTONDOWN:
            self.left_point = (x, y)
            self.left_display = self.prepare_image(self.left_image.copy())
            self.left_display = self.draw_marker(self.left_display, self.left_point)

    def mouse_callback_right(self, event, x, y, flags, param):
        if event == cv2.EVENT_LBUTTONDOWN:
            self.right_point = (x, y)
            self.right_display = self.prepare_image(self.right_image.copy())
            self.right_display = self.draw_marker(self.right_display, self.right_point)

    def save_displacements(self):
        if not self.displacements:
            print("❌ Nenhum deslocamento registrado.")
            return

        save_path = os.path.join(self.folder, 'manual_displacements.npz')
        dxs = [d['displacement'][0] for d in self.displacements]
        dys = [d['displacement'][1] for d in self.displacements]
        pts1 = [d['point1'] for d in self.displacements]
        pts2 = [d['point2'] for d in self.displacements]
        from_files = [d['from'] for d in self.displacements]
        to_files = [d['to'] for d in self.displacements]

        np.savez(save_path,
                 dx=dxs, dy=dys,
                 point1=pts1, point2=pts2,
                 from_images=from_files,
                 to_images=to_files)

        print(f"\n✅ {len(self.displacements)} deslocamento(s) salvos em: {save_path}")
        print(f"📊 Estatísticas dos deslocamentos:")
        print(f"   • dx: min={min(dxs):+d}, max={max(dxs):+d}, média={np.mean(dxs):+.1f}")
        print(f"   • dy: min={min(dys):+d}, max={max(dys):+d}, média={np.mean(dys):+.1f}")


if __name__ == "__main__":
    ManualDisplacementEstimator()