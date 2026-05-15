from pathlib import Path
import time

import cv2
import numpy as np
from virtual_encoder.encoder_gs import EncoderGS
from virtual_encoder.hal.camera import CameraDrawing

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
    def __init__(self, gs: EncoderGS, config, tipo, last_modo):
        self.gs = gs
        self.config = config
        self.tipo = tipo
        self.return_modo = last_modo

        self.gs.set("estado", "Calibracao")

    def stop(self):
        pass

    def __save_to_cache(self, spatial_resolution):
        spatial_resolution_cache_file = self.config.get("camera", dict()).get("spatial_resolution_cache", "/home/pi/spatial_resolution.txt")

        with open(spatial_resolution_cache_file, "w") as f:
            f.write(f"{spatial_resolution}")

    def __calibrate_exposure(self):
        self.gs.camera.calibrate_exposure(
            min=self.config["camera"]["min_exposure"],
            max=self.config["camera"]["max_exposure"],
            target=self.config["camera"]["target_average"],
        )

        self.gs.add_message("Realizando calibração, aguarde...")

        exposure = self.gs.camera.get_exposure()

        self.gs.add_message(
            f"Exposição calibrada para {exposure} us"
        )

        
        exposure_cache_file = self.config.get("camera", dict()).get("exposure_cache", "/home/pi/exposure.txt")
        with open(exposure_cache_file, "w") as f:
            f.write(f"{exposure}")

    def __calibrate_spatial_resolution_photo(self, printed_diameter):
        radius_found = []

        self.gs.add_message("Realizando calibração, aguarde...")

        real_camera = self.gs.camera
        self.gs.camera = CameraDrawing(real_camera)

        try:
            t0 = time.time()
            while time.time() - t0 < 5:
                width, height, radius, output_img = find_circle_and_bbox(real_camera.peek_img())

                if width and height:
                    self.gs.camera.set_img(output_img)
                    radius_found.append(radius)

                time.sleep(0.1)


            if len(radius_found) > 0:
                self.gs.spatial_resolution = printed_diameter / (2 * np.average(radius_found))

                self.gs.add_message(
                    f"Resolução espacial calibrada para {1/self.gs.spatial_resolution:.3f} px/mm"
                )
                self.gs.send_event("reset_position")

                self.__save_to_cache(self.gs.spatial_resolution)
            else:
                self.gs.add_message("Padrão de calibração não encontrado! Tente novamente")
        finally:
            self.gs.camera = real_camera


    def __calibrate_spatial_resolution_displacement(self, displacement_mm):
        try:
            if displacement_mm < 0.9:
                self.gs.add_message("Valor de deslocamento inválido. O valor é muito pequeno")
                return


            pos = self.gs.get("pos")
            x, y = pos["x"], pos["y"]

            displacement_px =  (x*x + y*y)**0.5 / self.gs.spatial_resolution
            self.gs.spatial_resolution = displacement_mm / displacement_px

            self.gs.add_message(
                f"Resolução espacial calibrada para {1/self.gs.spatial_resolution:.3f} px/mm"
            )

            self.__save_to_cache(self.gs.spatial_resolution)

        except Exception as e:
            self.gs.add_message("Erro na calibração")

    def run(self):
        match self.tipo:
            case "exposure":
                self.__calibrate_exposure()

            case ("spatial_resolution", "photo", printed_diameter):
                self.__calibrate_spatial_resolution_photo(round(printed_diameter))

            case ("spatial_resolution", "displacement", displacement):
                self.__calibrate_spatial_resolution_displacement(displacement)

        self.gs.send_event(("set_modo", self.return_modo))

    def handle_event(self, ev):
        pass
