import numpy as np
from PIL import Image, ImageOps


def to_grayscale(img):
    return np.asarray(ImageOps.grayscale(Image.fromarray(img)))
