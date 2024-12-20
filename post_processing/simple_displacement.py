import os
import numpy as np
import glob
from PIL import Image, ImageOps, ImageEnhance
from visual_odometer.preprocessing import image_preprocessing
from visual_odometer.displacement_estimators.svd import svd_method

folder_path = "data/42_20241105T022421"

def load_image(filename):
    # Abrir imagem em RGB
    img_rgb = Image.open(filename)

    # Melhorar o brilho e o contraste
    enhancer_brightness = ImageEnhance.Brightness(img_rgb)
    img_rgb = enhancer_brightness.enhance(1.5)  # Ajuste o valor para mais brilho (1.0 é padrão)

    enhancer_contrast = ImageEnhance.Contrast(img_rgb)
    img_rgb = enhancer_contrast.enhance(1.5)  # Ajuste o valor para mais contraste

    # Converter para escala de cinza
    img_grayscale = ImageOps.grayscale(img_rgb)

    # Converter para matriz NumPy
    img_array = np.asarray(img_grayscale)

    return image_preprocessing(img_array)

def process_displacements(img_stream):
    # Inicializa posição
    current_position = np.array([0.0, 0.0])
    old_processed_img = img_stream.pop(0)

    for idx, img_preprocessed in enumerate(img_stream):
        if img_preprocessed is None:
            print(f"Atenção: A imagem {idx + 1} foi ignorada devido a NaN ou Inf.")
            continue  # Ignora imagens inválidas

        dx, dy = svd_method(img_preprocessed, old_processed_img, 640, 480)

        current_position[0] += dx
        current_position[1] += dy

        print(f"Deslocamento 2D para a imagem {idx + 1}: dx = {dx}, dy = {dy}")
        print(f"Posição acumulada 2D: {current_position}")

        old_processed_img = img_preprocessed

    return current_position

image_files = sorted(glob.glob(os.path.join(folder_path, '*.jpg')))
img_stream = [load_image(img_file) for img_file in image_files]
process_displacements(img_stream)