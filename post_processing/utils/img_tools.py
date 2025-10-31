import os

from PIL import Image, ImageEnhance, ImageOps
import numpy as np

def apply_img_filters(filename, img_configs):
    img_enhancer_configs = img_configs["Image Enhancers"]
    img_rgb = Image.open(filename)

    # Ajuste de brilho
    brightness = img_enhancer_configs.get("brightness", None)
    if brightness is not None:
        enhancer_brightness = ImageEnhance.Brightness(img_rgb)
        img_rgb = enhancer_brightness.enhance(brightness)

    # Ajuste de contraste
    contrast = img_enhancer_configs.get("contrast", None)
    if contrast is not None:
        enhancer_contrast = ImageEnhance.Contrast(img_rgb)
        img_rgb = enhancer_contrast.enhance(contrast)

    # Converter para escala de cinza
    img_grayscale = ImageOps.grayscale(img_rgb)
    img_array = np.asarray(img_grayscale)

    # Normalização
    if img_enhancer_configs.get("normalize", False):
        img_array = img_array / 255.0

    return img_array

def extract_timestamp_from_txt(filename):
    return int(os.path.basename(filename).split('.')[0])
