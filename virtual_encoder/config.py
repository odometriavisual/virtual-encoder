from dataclasses import dataclass
from pathlib import Path
import tomllib
import os
import subprocess


@dataclass
class Config:
    debug: bool = False
    default_modo: str = "ModoOdometro"

    cache: Path = Path("/home/pi/cache.json")
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

    @staticmethod
    def get_config_path():
        return Path(os.getenv("HOME", default="/home/pi") + "/virtual_encoder.toml")

    @staticmethod
    def load():
        config_path = Config.get_config_path()

        if not config_path.is_file():
            Path("extra/default_config.toml").copy(config_path)

        toml = tomllib.loads(config_path.read_text())
        config = Config(
            debug=toml["debug"],
            default_modo=toml["default_modo"],
            cache=Path(toml["cache"]),
            frontend_directory=Path(toml["frontend"]["dist_directory"]),
            acquisition_directory=Path(toml["acquisition"]["directory"]),
            gpio_sda=toml["gpio"]["sda"],
            gpio_scl=toml["gpio"]["scl"],
            gpio_relay=toml["gpio"]["relay"],
            gpio_led=toml["gpio"]["led"],
            gpio_bno_reset=toml["gpio"]["bno_reset"],
            gpio_serdes_powerdown=toml["gpio"]["serdes_powerdown"],
            gpio_encoders_panther=toml["gpio"]["encoders_panther"],
            network_interface=toml["network"]["interface"],
            camera_min_exposure=toml["camera"]["min_exposure"],
            camera_max_exposure=toml["camera"]["max_exposure"],
            camera_target_average=toml["camera"]["target_average"],
            serdes_serializer_address=toml["serdes"]["serializer_address"],
            serdes_deserializer_address=toml["serdes"]["deserializer_address"],
            serdes_verbose=toml["serdes"]["verbose"],
            serdes_eye_monitor=toml["serdes"]["eye_monitor"],
            serdes_force_camera_on=toml["serdes"]["force_camera_on"],
            display_address=toml["display"]["address"],
            display_width=toml["display"]["width"],
            display_height=toml["display"]["height"],
            version=(
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
            ),
        )

        # validate config

        return config
