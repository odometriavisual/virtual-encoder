import cv2
import numpy as np
import os
import glob
from tkinter import filedialog, Tk

CROP_SIZE = 40
STEP = 5
GAMMA = 1.5
DISPLAY_SCALE = 3.0
COMPARISON_ZOOM = 3


def load_image(path, use_color=True):
    if use_color:
        img = cv2.imread(path, cv2.IMREAD_COLOR)
    else:
        img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)

    if img is None:
        return None

    gamma_corrected = np.power(img / 255.0, 1.0 / GAMMA)
    img = np.uint8(gamma_corrected * 255)
    return img


def ask_folder():
    Tk().withdraw()
    return filedialog.askdirectory(title="Selecione a pasta com imagens")


def resize_for_display(img, scale=None):
    if scale is None:
        scale = DISPLAY_SCALE
    if scale == 1.0:
        return img, scale
    height, width = img.shape[:2]
    new_width = int(width * scale)
    new_height = int(height * scale)
    resized = cv2.resize(img, (new_width, new_height), interpolation=cv2.INTER_NEAREST)
    return resized, scale


def select_point(img, window_name, preview_img=None, display_scale=DISPLAY_SCALE):
    point = []

    def click(event, x, y, flags, param):
        if event == cv2.EVENT_LBUTTONDOWN:
            original_x = int(x / param['scale'])
            original_y = int(y / param['scale'])
            point.append((original_x, original_y))
            cv2.destroyAllWindows()

    display_img, scale = resize_for_display(img, display_scale)
    display_img = display_img.copy()
    font_scale = 0.7 * scale if scale > 1 else 0.7
    thickness = max(1, int(2 * scale))

    cv2.putText(display_img, "Clique no ponto de interesse", (int(10 * scale), int(30 * scale)),
                cv2.FONT_HERSHEY_SIMPLEX, font_scale, (0, 255, 0) if len(display_img.shape) == 3 else 255, thickness)

    if preview_img is not None:
        preview_resized, _ = resize_for_display(preview_img, display_scale)
        cv2.putText(preview_resized, "Proxima imagem (preview)", (int(10 * scale), int(30 * scale)),
                    cv2.FONT_HERSHEY_SIMPLEX, font_scale, (255, 255, 0) if len(preview_resized.shape) == 3 else 255,
                    thickness)
        cv2.imshow("Preview - Próxima Imagem", preview_resized)

    cv2.imshow(window_name, display_img)
    cv2.setMouseCallback(window_name, click, {'scale': scale})
    cv2.waitKey(0)
    return point[0] if point else None


def second_point_with_overlay(img2, crop, window_name, display_scale=DISPLAY_SCALE):
    point = []

    def mouse_event(event, x, y, flags, param):
        original_x = int(x / param['scale'])
        original_y = int(y / param['scale'])
        temp_original = param['original_img'].copy()
        h, w = crop.shape[:2]
        top = max(0, original_y - h // 2)
        bottom = min(temp_original.shape[0], original_y + h // 2)
        left = max(0, original_x - w // 2)
        right = min(temp_original.shape[1], original_x + w // 2)
        crop_top = 0 if original_y - h // 2 >= 0 else (h // 2 - original_y)
        crop_bottom = h if original_y + h // 2 <= temp_original.shape[0] else h - (original_y + h // 2 - temp_original.shape[0])
        crop_left = 0 if original_x - w // 2 >= 0 else (w // 2 - original_x)
        crop_right = w if original_x + w // 2 <= temp_original.shape[1] else w - (original_x + w // 2 - temp_original.shape[1])

        if top < bottom and left < right and crop_top < crop_bottom and crop_left < crop_right:
            region = temp_original[top:bottom, left:right]
            crop_region = crop[crop_top:crop_bottom, crop_left:crop_right]

            if region.shape[:2] == crop_region.shape[:2]:
                if len(region.shape) != len(crop_region.shape):
                    if len(crop_region.shape) == 2:
                        crop_region = cv2.cvtColor(crop_region, cv2.COLOR_GRAY2BGR)
                    elif len(region.shape) == 2:
                        region = cv2.cvtColor(region, cv2.COLOR_GRAY2BGR)
                        temp_original = cv2.cvtColor(temp_original, cv2.COLOR_GRAY2BGR)

                try:
                    blend = cv2.addWeighted(region, 0.4, crop_region, 0.6, 0)
                    temp_original[top:bottom, left:right] = blend
                except:
                    pass

                crop_disp = cv2.resize(crop_region, (150, 150))
                region_disp = cv2.resize(region, (150, 150))

                if len(crop_disp.shape) != 3:
                    crop_disp = cv2.cvtColor(crop_disp, cv2.COLOR_GRAY2BGR)
                if len(region_disp.shape) != 3:
                    region_disp = cv2.cvtColor(region_disp, cv2.COLOR_GRAY2BGR)

                comparison = np.vstack([crop_disp, region_disp])
                cv2.imshow("Comparacao Crop", comparison)

        temp_display, scale = resize_for_display(temp_original, display_scale)
        display_x = int(original_x * scale)
        display_y = int(original_y * scale)
        cross_size = max(5, int(10 * scale))
        cv2.line(temp_display, (display_x - cross_size, display_y), (display_x + cross_size, display_y),
                 (0, 255, 0) if len(temp_display.shape) == 3 else 255, max(1, int(scale)))
        cv2.line(temp_display, (display_x, display_y - cross_size), (display_x, display_y + cross_size),
                 (0, 255, 0) if len(temp_display.shape) == 3 else 255, max(1, int(scale)))

        font_scale = 0.7 * scale if scale > 1 else 0.7
        thickness = max(1, int(2 * scale))
        cv2.putText(temp_display, "Clique no mesmo ponto na segunda imagem", (int(10 * scale), int(30 * scale)),
                    cv2.FONT_HERSHEY_SIMPLEX, font_scale, (0, 255, 0) if len(temp_display.shape) == 3 else 255,
                    thickness)

        if event == cv2.EVENT_LBUTTONDOWN:
            point.append((original_x, original_y))
            cv2.destroyAllWindows()
            cv2.destroyWindow("Comparacao Crop")

        cv2.imshow(window_name, temp_display)

    display_img, scale = resize_for_display(img2, display_scale)
    cv2.namedWindow(window_name)
    cv2.setMouseCallback(window_name, mouse_event, {'scale': scale, 'original_img': img2})
    temp_display = display_img.copy()
    font_scale = 0.7 * scale if scale > 1 else 0.7
    thickness = max(1, int(2 * scale))
    cv2.putText(temp_display, "Mova o mouse para ver o overlay do recorte", (int(10 * scale), int(30 * scale)),
                cv2.FONT_HERSHEY_SIMPLEX, font_scale, (0, 255, 0) if len(temp_display.shape) == 3 else 255, thickness)
    cv2.imshow(window_name, temp_display)

    while not point:
        cv2.waitKey(1)

    return point[0]


def draw_grid(img, grid_color=(0, 255, 0), step=10):
    """Desenha um grid sobre a imagem."""
    h, w = img.shape[:2]
    for x in range(0, w, step):
        cv2.line(img, (x, 0), (x, h), grid_color, 1)
    for y in range(0, h, step):
        cv2.line(img, (0, y), (w, y), grid_color, 1)
    return img

def show_comparison_window(crop1, crop2, zoom=COMPARISON_ZOOM):
    crop1_resized = cv2.resize(crop1, None, fx=zoom, fy=zoom, interpolation=cv2.INTER_NEAREST)
    crop2_resized = cv2.resize(crop2, None, fx=zoom, fy=zoom, interpolation=cv2.INTER_NEAREST)

    crop1_resized = draw_grid(crop1_resized.copy())
    crop2_resized = draw_grid(crop2_resized.copy())

    comparison = np.vstack([crop1_resized, crop2_resized])
    cv2.imshow("Comparacao lado a lado (zoom + grid)", comparison)
    cv2.waitKey(1)


def run_manual_displacement(folder_path, step=STEP, crop_size=CROP_SIZE, use_color=True, display_scale=DISPLAY_SCALE):
    extensions = ['*.jpg', '*.jpeg', '*.png', '*.bmp', '*.tiff']
    image_paths = []
    for ext in extensions:
        image_paths.extend(glob.glob(os.path.join(folder_path, ext)))
        image_paths.extend(glob.glob(os.path.join(folder_path, ext.upper())))

    image_paths = sorted(image_paths)
    n = len(image_paths)

    if n == 0:
        print("Nenhuma imagem encontrada na pasta!")
        return

    print(f"Encontradas {n} imagens")

    real_displacements = np.zeros((n, 2), dtype=np.float32)
    previous_point = None

    for i in range(0, n - step, step):
        print(f"\nFrame {i} → {i + step}")

        img1 = load_image(image_paths[i], use_color)
        img2 = load_image(image_paths[i + step], use_color)

        if img1 is None or img2 is None:
            print(f"Erro ao carregar imagens: {image_paths[i]} ou {image_paths[i + step]}")
            continue

        key = None
        while key not in [ord('1'), ord('2'), ord('s'), 27]:
            preview, scale = resize_for_display(img1, display_scale)
            instructions = [
                "OPCOES:",
                "1: Selecionar novo ponto",
                "2: Usar ponto anterior",
                "s: Pular este par",
                "ESC: Sair"
            ]
            font_scale = 0.6 * scale if scale > 1 else 0.6
            thickness = max(1, int(2 * scale))

            for idx, text in enumerate(instructions):
                color = (0, 255, 255) if use_color else 255
                cv2.putText(preview, text, (int(10 * scale), int(30 * scale) + idx * int(25 * scale)),
                            cv2.FONT_HERSHEY_SIMPLEX, font_scale, color, thickness)

            cv2.imshow("Imagem 1 - Escolha opcao", preview)
            key = cv2.waitKey(0)

        cv2.destroyAllWindows()

        if key == 27:
            break
        elif key == ord('s'):
            print("Pulando este par...")
            continue

        next_img = None
        if i + 2 * step < n:
            next_img = load_image(image_paths[i + 2 * step], use_color)

        if key == ord('1'):
            pt1 = select_point(img1, "Imagem 1 - Clique no ponto", next_img, display_scale)
            if pt1 is None:
                print("Nenhum ponto selecionado")
                continue
            previous_point = pt1
        elif key == ord('2') and previous_point is not None:
            pt1 = previous_point
            print(f"Usando ponto anterior: {pt1}")
        else:
            print("Nenhum ponto anterior disponível.")
            continue

        x1, y1 = pt1
        top = max(0, y1 - crop_size)
        bottom = min(img1.shape[0], y1 + crop_size)
        left = max(0, x1 - crop_size)
        right = min(img1.shape[1], x1 + crop_size)
        crop = img1[top:bottom, left:right]

        if crop.size == 0:
            print("Recorte inválido")
            continue

        pt2 = second_point_with_overlay(img2, crop, "Imagem 2 - Clique no mesmo ponto", display_scale)
        x2, y2 = pt2

        crop2 = img2[max(0, y2 - crop_size):min(img2.shape[0], y2 + crop_size),
                     max(0, x2 - crop_size):min(img2.shape[1], x2 + crop_size)]

        show_comparison_window(crop, crop2, COMPARISON_ZOOM)

        dx, dy = x2 - x1, y2 - y1
        real_displacements[i + step] = [dx, dy]
        print(f"Deslocamento manual: dx={dx:.2f}, dy={dy:.2f}")

    out_path = os.path.join(folder_path, "real_displacements.npz")
    np.savez(out_path, real_displacements=real_displacements)
    print(f"\nDeslocamentos salvos em: {out_path}")

    non_zero = real_displacements[np.any(real_displacements != 0, axis=1)]
    if len(non_zero) > 0:
        print(f"\nEstatísticas:")
        print(f"Total de deslocamentos medidos: {len(non_zero)}")
        print(f"Deslocamento médio: dx={np.mean(non_zero[:, 0]):.2f}, dy={np.mean(non_zero[:, 1]):.2f}")
        print(f"Desvio padrão: dx={np.std(non_zero[:, 0]):.2f}, dy={np.std(non_zero[:, 1]):.2f}")

if __name__ == "__main__":
    print("Detector de Deslocamento Manual")
    print("=" * 40)
    folder = ask_folder()
    if folder:
        print(f"Pasta selecionada: {folder}")
        print("\nEscolha o modo:")
        print("1 - Imagens coloridas (recomendado)")
        print("2 - Escala de cinza")
        while True:
            choice = input("Digite sua escolha (1 ou 2): ")
            if choice == '1':
                use_color = True
                break
            elif choice == '2':
                use_color = False
                break
            else:
                print("Escolha inválida!")

        print(f"\nEscala de visualização atual: {DISPLAY_SCALE}x")
        display_scale = DISPLAY_SCALE
        while True:
            try:
                scale_input = input(f"Digite a escala desejada (1-10) ou ENTER para usar {display_scale}x: ")
                if scale_input.strip() == "":
                    break
                scale = float(scale_input)
                if 1 <= scale <= 10:
                    display_scale = scale
                    break
                else:
                    print("Escala deve estar entre 1 e 10!")
            except ValueError:
                print("Digite um número válido!")

        print(f"Usando escala de visualização: {display_scale}x")
        run_manual_displacement(folder, use_color=use_color, display_scale=display_scale)
    else:
        print("Nenhuma pasta selecionada!")
