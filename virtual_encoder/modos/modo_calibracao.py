import time

import cv2
import numpy as np
from virtual_encoder.hal.camera import CameraDrawing
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from virtual_encoder.virtual_encoder import VirtualEncoder


def find_circle_and_bbox(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (7, 7), 9999999)
    min_radius = 50
    max_radius = 150

    circles = cv2.HoughCircles(
        gray,
        cv2.HOUGH_GRADIENT_ALT,
        dp=1.5,
        minDist=20,
        param1=200,
        param2=0.95,
        minRadius=min_radius,
        maxRadius=max_radius,
    )

    if circles is not None:
        x, y, r = circles[0][0]
        d = 2 * r

        # bounding box
        top_left = (x - r, y - r)
        bottom_right = (x + r, y + r)

        cv2.rectangle(
            frame,
            np.int32(np.around(top_left)),
            np.int32(np.around(bottom_right)),
            (0, 0, 255),
            3,
        )
        cv2.circle(frame, (int(round(x)), int(round(y))), int(round(r)), (0, 255, 0), 3)

        return float(d), float(d), float(r), frame

    else:
        return None, None, None, frame


class ModoCalibracao:
    def __init__(self, ve: "VirtualEncoder", config, tipo, last_modo):
        self.ve = ve
        self.config = config
        self.tipo = tipo
        self.return_modo = last_modo

        self.ve.set("estado", "Calibracao")

    def stop(self):
        pass

    def __save_to_cache(self, spatial_resolution):
        spatial_resolution_cache_file = self.config.get("camera", dict()).get(
            "spatial_resolution_cache", "/home/pi/spatial_resolution.txt"
        )

        with open(spatial_resolution_cache_file, "w") as f:
            f.write(f"{spatial_resolution}")

    def __calibrate_exposure(self):
        self.ve.camera.calibrate_exposure(
            min=self.config["camera"]["min_exposure"],
            max=self.config["camera"]["max_exposure"],
            target=self.config["camera"]["target_average"],
        )

        self.ve.add_message("Realizando calibração, aguarde...")

        exposure = self.ve.camera.get_exposure()

        self.ve.add_message(f"Exposição calibrada para {exposure} us")

        exposure_cache_file = self.config.get("camera", dict()).get(
            "exposure_cache", "/home/pi/exposure.txt"
        )
        with open(exposure_cache_file, "w") as f:
            f.write(f"{exposure}")

    def __calibrate_spatial_resolution_photo(self, printed_diameter):
        radius_found = []

        self.ve.add_message("Realizando calibração, aguarde...")

        real_camera = self.ve.camera
        self.ve.camera = CameraDrawing(real_camera)

        try:
            t0 = time.time()
            while time.time() - t0 < 5:
                input_img = real_camera.peek_img()
                width, height, radius, output_img = find_circle_and_bbox(input_img)

                if width and height:
                    self.ve.camera.set_img(output_img)
                    radius_found.append(radius)
                else:
                    self.ve.camera.set_img(input_img)

                time.sleep(1 / 60)

            if len(radius_found) > 0:
                self.ve.spatial_resolution = printed_diameter / (
                    2 * np.average(radius_found)
                )

                self.ve.add_message(
                    f"Resolução espacial calibrada para {1 / self.ve.spatial_resolution:.3f} px/mm"
                )
                self.ve.send_event("reset_position")

                self.__save_to_cache(self.ve.spatial_resolution)
            else:
                self.ve.add_message(
                    "Padrão de calibração não encontrado! Tente novamente"
                )
        finally:
            self.ve.camera = real_camera

    def __calibrate_spatial_resolution_displacement(self, inverse_spatial_resolution):
        try:
            if inverse_spatial_resolution < 0.000001:
                self.ve.add_message(
                    "Valor de deslocamento inválido. O valor é muito pequeno"
                )
                return

            self.ve.spatial_resolution = 1 / inverse_spatial_resolution

            self.ve.add_message(
                f"Resolução espacial calibrada para {inverse_spatial_resolution:.2f} px/mm"
            )

            self.__save_to_cache(self.ve.spatial_resolution)

        except Exception as e:
            print(e)
            self.ve.add_message("Erro na calibração")

    def run(self):
        match self.tipo:
            case "exposure":
                self.__calibrate_exposure()

            case ("spatial_resolution", "photo", printed_diameter):
                self.__calibrate_spatial_resolution_photo(round(printed_diameter))

            case ("spatial_resolution", "displacement", inverse_spatial_resolution):
                self.__calibrate_spatial_resolution_displacement(
                    inverse_spatial_resolution
                )

        self.ve.send_event(("set_modo", self.return_modo))

    def handle_event(self, ev):
        pass
