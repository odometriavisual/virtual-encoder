from visual_odometer import VisualOdometer
import time
import glob
import os

def load(filename):
    from PIL import Image, ImageOps
    import numpy as np

    img_array_rgb = Image.open(filename)
    img_grayscale = ImageOps.grayscale(img_array_rgb)
    img_array = np.asarray(img_grayscale)

    return img_array

start_time = time.time()

image_folder = 'C:/Users/Daniel Santin/PycharmProjects/virtual-encoder2/post_processing/data/picam_imgs/1_20241014_180236'

image_files = sorted(glob.glob(os.path.join(image_folder, '*.jpg')))
img_stream = [load(img_file) for img_file in image_files]

odometer = VisualOdometer(img_size=(640, 480),num_threads=8)
fps = 80

try:
    odometer._start_pool()
    time.sleep(.1)
    for img in img_stream:
        odometer.feed_image(img)
        time.sleep(1 / fps)
    end_time = time.time()
    execution_time = end_time - start_time
    print(f"Tempo: {execution_time:.3f} segundos")
    print(f"FPS: {len(img_stream) / execution_time}")

finally:
    print(len(odometer.displacements))
    odometer._reset_pool()
    exit()
