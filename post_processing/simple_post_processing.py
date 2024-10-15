from visual_odometer import VisualOdometer
from visual_odometer.preprocessing import image_preprocessing
from visual_odometer.displacement_estimators.svd import svd_method

import glob
import os
import time

def load(filename):
    from PIL import Image, ImageOps
    import numpy as np

    img_array_rgb = Image.open(filename)
    img_grayscale = ImageOps.grayscale(img_array_rgb)
    img_array = np.asarray(img_grayscale)
    return img_array

def preprocessing(img_array):
    pre_processed_img = image_preprocessing(img_array)
    return pre_processed_img

image_folder = 'C:/Users/Daniel Santin/PycharmProjects/virtual-encoder2/post_processing/data/picam_imgs/1_20241014_180236'

image_files = sorted(glob.glob(os.path.join(image_folder, '*.jpg')))
img_stream = [load(img_file) for img_file in image_files]
img_preprocessed_list = [preprocessing(img_array) for img_array in img_stream]

img_size = img_stream[0].shape
old_processed_img = img_preprocessed_list.pop(0)

start_time = time.time()
for img_preprocessed in img_preprocessed_list:
    dx,dy = svd_method(img_preprocessed, old_processed_img, img_size[1], img_size[0])
    old_processed_img = img_preprocessed
    #print(f'Displacement estimate: x = {dx}, y = {dy}')
end_time = time.time()
execution_time = end_time - start_time
print(f"Tempo: {execution_time:.3f} segundos")
print(f"FPS: {len(img_stream)/execution_time}")
