#!/usr/bin/env python
import threading
import time
import tomllib
import os
import subprocess

from virtual_encoder.modos import ModoAutonomo, ModoOdometro, ModoTempo, ModoCalibracao
from virtual_encoder.virtual_encoder import VirtualEncoder
from virtual_encoder.webui.server import WebuiApp


def load_config(config_path):
    if not os.path.isfile(config_path):
        with open("extra/default_config.toml", "r") as default_config_file:
            default_config = default_config_file.read()

        with open(config_path, "w") as config_file:
            config_file.write(default_config)

    with open(config_path, "rb") as config_file:
        config = tomllib.load(config_file)

    config["version"] = (
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


def _get_ip(ve: VirtualEncoder):
    while True:
        ve.get("rpi5")["ip"] = ve.network_interface.get_ip_address()
        time.sleep(30)


def _get_temp(ve: VirtualEncoder):
    while True:
        ve.get("rpi5")["temp"] = ve.thermal_sensors.get_cpu_temp()
        time.sleep(1)


def main():
    config = load_config(
        os.getenv("HOME", default="/home/pi") + "/virtual_encoder.toml"
    )
    ve = VirtualEncoder(config, default_modo_lambda=lambda ve: ModoOdometro(ve))

    webui = WebuiApp(ve, config)
    threading.Thread(target=webui.run, daemon=True).start()

    time.sleep(1)

    for task in [_get_ip, _get_temp]:
        threading.Thread(target=task, daemon=True, args=(ve,)).start()

    while True:
        while ev := ve.poll_event():
            ve.handle_event(ev)

        ve.run()

if __name__ == "__main__":
    main()
