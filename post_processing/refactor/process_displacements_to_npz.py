
import numpy as np
import config
import glob
import os

from visual_odometer.preprocessing import image_preprocessing
from visual_odometer.displacement_estimators.svd import svd_method
from imu_tools import load_imu_data, find_closest_imu_data
from image_tools import apply_img_filters, extract_timestamp_from_txt
from tkinter import Tk, filedialog
from tqdm import tqdm

# Selecionar pasta de processamento
Tk().withdraw()
image_folder = filedialog.askdirectory(title="Selecione a pasta de imagens")
imu_file = os.path.join(image_folder, "imu.csv")

imu_data = load_imu_data(imu_file)
image_files = sorted(glob.glob(os.path.join(image_folder, '*.jpg')))
img_stream = [apply_img_filters(img_file, config.IMAGE_CONFIGS) for img_file in tqdm(image_files, desc="Carregando imagens")]
img_preprocessed_list = [image_preprocessing(img_array, config.IMAGE_CONFIGS) for img_array in tqdm(img_stream, desc="Pré-processando imagens")]

img_size = img_stream[0].shape
old_processed_img = img_preprocessed_list.pop(0)
list_displacements = []
list_quaternions = []

for img_preprocessed, img_file, img_raw in tqdm(zip(img_preprocessed_list, image_files, img_stream[1:]), total=len(image_files) - 1, desc="Calculando deslocamento"):
    dx, dy = svd_method(img_preprocessed, old_processed_img, img_size[0], img_size[1], phase_windowing=config.phase_windowing)
    displacement = np.array([dx, dy])

    img_timestamp = extract_timestamp_from_txt(img_file)
    closest_quaternion = find_closest_imu_data(imu_data, img_timestamp)

    quaternion_array = [closest_quaternion['qw'], closest_quaternion['qx'], closest_quaternion['qy'],closest_quaternion['qz']]
    list_quaternions.append(np.array(quaternion_array))

    if config.skip_frames is True:
        if np.linalg.norm(displacement) > config.skip_min_distance:
            list_displacements.append(displacement)
            old_processed_img = img_preprocessed
        else:
            list_displacements.append(np.asarray(np.zeros(2, dtype=float)))
    else:
        list_displacements.append(displacement)
        old_processed_img = img_preprocessed

numpy_folder = "displacements_data.npz"
np.savez(numpy_folder, displacements=np.array(list_displacements), quaternions=np.array(list_quaternions))
