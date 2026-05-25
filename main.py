#!/usr/bin/env python
import threading
import time
import subprocess
import tomllib
import os

from virtual_encoder.modos import ModoAutonomo, ModoOdometro, ModoTempo, ModoCalibracao
from virtual_encoder.encoder_gs import EncoderGS
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


def _get_ip(gs: EncoderGS):
    while True:
        gs.get("rpi5")["ip"] = gs.network_interface.get_ip_address()
        time.sleep(30)


def _get_temp(gs: EncoderGS):
    while True:
        gs.get("rpi5")["temp"] = gs.thermal_sensors.get_cpu_temp()
        time.sleep(1)


def main():
    config = load_config(
        os.getenv("HOME", default="/home/pi") + "/virtual_encoder.toml"
    )
    gs = EncoderGS(config, default_modo_lambda=lambda gs: ModoOdometro(gs))

    webui = WebuiApp(gs, config)
    threading.Thread(target=webui.run, daemon=True).start()

    time.sleep(1)

    for task in [_get_ip, _get_temp]:
        threading.Thread(target=task, daemon=True, args=(gs,)).start()

    while True:
        while ev := gs.poll_event():
            match gs.modo, ev:
                case _, ("set_modo", "Autonomo"):
                    gs.set_modo(ModoAutonomo(gs))
                case _, ("set_modo", "Odometro"):
                    gs.set_modo(ModoOdometro(gs))
                case _, ("set_modo", "Tempo"):
                    gs.set_modo(ModoTempo(gs))

                case _, ("shutdown", "all"):
                    try:
                        gs.led.turn_off()
                        subprocess.run(["sudo", "poweroff"])
                    except subprocess.SubprocessError:
                        pass
                case _, ("shutdown", "led"):
                    gs.led.turn_off()
                case _, ("shutdown", "relay"):
                    gs.relay.turn_off()

                case _, ("reboot", "all"):
                    try:
                        subprocess.run(["sudo", "reboot"])
                    except subprocess.SubprocessError:
                        pass
                case _, ("reboot", "led"):
                    gs.led.turn_off()
                    time.sleep(0.5)
                    gs.led.turn_on()
                case _, ("reboot", "relay"):
                    gs.relay.turn_off()
                    time.sleep(5)
                    gs.relay.turn_on()

                case _, ("set_exposure", value):
                    gs.camera.set_exposure(value)

                case ModoAutonomo(), ("calibrate", tipo):
                    gs.set_modo(ModoCalibracao(gs, config, tipo, "Autonomo"))
                case ModoOdometro(), ("calibrate", tipo):
                    gs.set_modo(ModoCalibracao(gs, config, tipo, "Odometro"))
                case ModoTempo(), ("calibrate", tipo):
                    gs.set_modo(ModoCalibracao(gs, config, tipo, "Tempo"))
                case _, ("calibrate", tipo):
                    gs.set_modo(ModoCalibracao(gs, config, tipo, "Odometro"))

                case _, "start_stream":
                    gs.camera.start_stream()
                case _, "stop_stream":
                    gs.camera.stop_stream()

                case _:
                    gs.modo.handle_event(ev)

        gs.modo.run()


if __name__ == "__main__":
    main()
