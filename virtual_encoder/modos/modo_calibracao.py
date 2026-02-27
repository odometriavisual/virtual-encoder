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
        self.gs.add_message(
            f"Exposição calibrada para {self.gs.camera.get_exposure()} us"
        )

    def handle_event(self, ev):
        pass
