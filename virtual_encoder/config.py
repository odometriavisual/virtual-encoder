from dataclasses import dataclass
from pathlib import Path
import json
import os
import subprocess


@dataclass
class Config:
    debug: bool = False
    default_modo: str = "ModoOdometro"

    frontend_directory: Path = Path("/home/pi/virtual-encoder/frontend/dist/")
    acquisition_directory: Path = Path("/home/pi/picam_imgs")

    gpio_sda: int = 2
    gpio_scl: int = 3
    gpio_relay: int = 25
    gpio_led: int = 17
    gpio_bno_reset: int = 27
    gpio_serdes_powerdown: int = 22
    gpio_encoders_panther: tuple[dict] = (
        {"A": 26, "B": 19},
        {"A": 5, "B": 23},
        {"A": 6, "B": 13},
    )

    network_interface: str = "eth0"

    imu_mode: str = "absolute"

    camera_spatial_resolution: int = 1
    camera_exposure: int | None = None
    camera_min_exposure: int = 75
    camera_max_exposure: int = 1000
    camera_target_average: int = 50

    serdes_serializer_address: int = 0x40
    serdes_deserializer_address: int = 0x2A
    serdes_verbose: bool = False
    serdes_eye_monitor: bool = False
    serdes_force_camera_on: bool = False

    display_address: int = 0x3C
    display_width: int = 128
    display_height: int = 64

    version: str = ""

    def __post_init__(self):
        self.frontend_directory = Path(self.frontend_directory)
        self.acquisition_directory = Path(self.acquisition_directory)

    @staticmethod
    def get_static_path():
        return Path(os.getenv("HOME", default="/home/pi") + "/virtual_encoder.static")

    @staticmethod
    def get_dynamic_path():
        return Path(os.getenv("HOME", default="/home/pi") + "/virtual_encoder.dynamic")

    def put_key(self, key, value):
        dynamic_path = Config.get_dynamic_path()
        if dynamic_path.is_file():
            dynamic_config = json.loads(dynamic_path.read_text())
        else:
            dynamic_config = dict()

        dynamic_config[key] = value
        self.__dict__[key] = value

        Config.get_dynamic_path().write_text(json.dumps(dynamic_config))

    @staticmethod
    def load():
        static_path = Config.get_static_path()
        dynamic_path = Config.get_dynamic_path()

        while True:
            try:
                static_config = json.loads(static_path.read_text())
                break

            except Exception:
                print("Erro ao carregar config estática, carregando config padrão...")
                Path("extra/default_static.json").copy(static_path)

        if dynamic_path.is_file():
            dynamic_config = json.loads(dynamic_path.read_text())
        else:
            dynamic_config = dict()

        merged_config = static_config | dynamic_config

        config = Config(**merged_config)
        config.version = (
            "v"
            + subprocess.run(
                # "git rev-parse --short HEAD".split(" "),
                'git --no-pager log -1 --format="%cI"'.split(" "),
                capture_output=True,
                encoding="UTF-8",
            )
            .stdout.strip()
            .replace("-", "")
            .replace(":", "")[3:9]
        )

        return config
