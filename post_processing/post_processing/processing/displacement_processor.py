import os
import glob

import numpy as np
from PIL import Image, ImageOps
import cv2
from tkinter import Tk, filedialog

from utils.img_tools import extract_timestamp_from_txt
from utils.imu_tools import load_imu_data, find_closest_imu_data
from visual_odometer import VisualOdometer

def load_img_grayscale(filename, apply_clahe=True, apply_denoise=True):
    """
    Carrega a imagem como grayscale, aplica CLAHE e denoise (opcionalmente).
    """
    img_rgb = Image.open(filename)
    img_gray = ImageOps.grayscale(img_rgb)
    img_np = np.array(img_gray)

    if apply_clahe:
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        img_np = clahe.apply(img_np)

    if apply_denoise:
        img_np = cv2.fastNlMeansDenoising(img_np, h=10, templateWindowSize=7, searchWindowSize=21)

    return img_np


def process_displacements(image_folder, force_reprocessing = False):
    """
    Processa as imagens da pasta e calcula os deslocamentos e dados do IMU associados.

    Retorna um dicionário com:
    - displacements: np.ndarray [N x 2]
    - quaternions: np.ndarray [N x 4]
    - timestamps: np.ndarray [N]
    """
    imu_file = os.path.join(image_folder, "imu.csv")
    data_file = os.path.join(image_folder, "displacements_data.npz")

    if os.path.exists(data_file) and (force_reprocessing is False):
        print(f"Carregando dados existentes de: {data_file}")
        data = np.load(data_file, allow_pickle=True)
        return {
            'displacements': data['displacements'],
            'quaternions': data['quaternions'],
            'timestamps': data['timestamps'],
            "image_folder": image_folder
        }

    if not os.path.exists(imu_file):
        raise FileNotFoundError(f"Arquivo IMU não encontrado em: {imu_file}")

    imu_data = load_imu_data(imu_file)
    image_files = sorted(glob.glob(os.path.join(image_folder, '*.jpg')))

    if not image_files:
        raise FileNotFoundError("Nenhuma imagem JPG encontrada na pasta.")

    print(f"Processando {len(image_files)} imagens...")

    odometer = VisualOdometer(img_shape=(640, 480))
    displacements, quaternions, timestamps = [], [], []

    for i, img_file in enumerate(image_files):
        print(f"[{i+1}/{len(image_files)}] {os.path.basename(img_file)}")

        img_timestamp = extract_timestamp_from_txt(img_file)
        quaternion = find_closest_imu_data(imu_data, img_timestamp)
        q_array = [quaternion['qw'], quaternion['qx'], quaternion['qy'], quaternion['qz']]

        img_processed = load_img_grayscale(img_file)
        odometer.feed_image(img_processed)

        dx, dy = odometer.get_displacement()
        displacements.append([dx, dy])
        quaternions.append(q_array)
        timestamps.append(img_timestamp)

    displacements = np.array(displacements)
    quaternions = np.array(quaternions)
    timestamps = np.array(timestamps)

    np.savez(data_file,
             displacements=displacements,
             quaternions=quaternions,
             timestamps=timestamps)

    print(f"Arquivo salvo: {data_file}")

    return {
        'displacements': displacements,
        'quaternions': quaternions,
        'timestamps': timestamps,
        'image_folder': image_folder
    }


def select_and_process_folder(config= None, force_reprocessing=False):
    """Abre um seletor de pasta e processa os deslocamentos"""
    Tk().withdraw()
    folder = filedialog.askdirectory(title="Selecione a pasta de imagens")
    if not folder:
        print("Nenhuma pasta selecionada.")
        return None
    return process_displacements(config, force_reprocessing)


