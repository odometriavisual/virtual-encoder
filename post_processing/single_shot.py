from visual_odometer import VisualOdometer
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


image_folder = 'C:/Users/Daniel Santin/PycharmProjects/virtual-encoder2/post_processing/data/picam_imgs/1_20241014_180236'

image_files = sorted(glob.glob(os.path.join(image_folder, '*.jpg')))
img_stream = [load(img_file) for img_file in image_files]

first_img = img_stream.pop(0)
old_img = first_img
odometer = VisualOdometer(first_img.shape)
odometer.save_config('./')

odometer.calibrate(new_xres=1.0, new_yres=1.0)
start_time = time.time()
for img in img_stream:
    dx, dy = odometer.estimate_displacement_between(old_img, img)
    old_img = img
    #print(f'Displacement estimate: x = {dx}, y = {dy}')
end_time = time.time()
execution_time = end_time - start_time
print(f"Tempo: {execution_time:.3f} segundos")
print(f"FPS: {len(img_stream)/execution_time}")
