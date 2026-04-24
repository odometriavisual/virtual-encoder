from pathlib import Path

from virtual_encoder.encoder_gs import EncoderGS


class ModoCalibracao:
    def __init__(self, gs: EncoderGS, config, last_modo):
        self.gs = gs
        self.config = config
        self.return_modo = last_modo

        self.gs.set("estado", "Calibracao")

    def stop(self):
        pass

    def run(self):
        self.gs.camera.calibrate_exposure(
            min=self.config["camera"]["min_exposure"],
            max=self.config["camera"]["max_exposure"],
            target=self.config["camera"]["target_average"],
        )
        self.gs.send_event(("set_modo", self.return_modo))

        exposure = self.gs.camera.get_exposure()

        self.gs.add_message(
            f"Exposição calibrada para {exposure} us"
        )

        with open(self.config["exposure_cache"], "w") as file:
            f.write(f"{exposure}")

    def handle_event(self, ev):
        pass
