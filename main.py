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
        with open(config_path, "w") as config_file:
            config_file.write(
                """# enables mock HALs, ie. runs the encoder without connecting to any hardware peripherals
                debug = false

                # uses older RPi camera and IMU insted of the new serdes camera
                use_legacy_camera = false

                [acquisition]
                # Directory where the acquisitions will be saved to
                directory = "/home/pi/picam_imgs"

                [gpio]
                # Sets GPIO/BCM pin numbers
                sda = 2
                scl = 3
                relay = 25
                led = 17
                bno_reset = 27
                serdes_powerdown = 22
                encoders_panther = [
                    { A = 26, B = 19 },
                    { A = 5, B = 23 },
                    { A = 6, B = 13 },
                ]

                [network]
                # Network interface used to access the interface
                interface = "eth0"

                [camera]
                # The calibration will choose a exposure in the defined range
                exposure_cache = "/home/pi/exposure.txt"
                min_exposure = 75
                max_exposure = 1000
                # The calibration will try to match the average pixel value to the target_average
                # The average is a value between 0 and 255
                target_average = 50

                [serdes]
                # I2c addresses for the serdes' chips
                serializer_address = 0x40
                deserializer_address = 0x2A
                verbose=false
                eye_monitor=false
                force_camera_on=false

                [display]
                # I2C address for the display
                address = 0x3C
                # Display screen size
                width = 128
                height = 64

                # enable verbose I2C info
                verbose = false

                # enable monitor for the eye diagram to test cable quality
                eye_monitor = false

                # non documented configuration from the serdes chip
                force_camera_on = false
                """.replace("                ", "")
            )

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
                    time.sleep(5)
                    gs.led.turn_on()
                case _, ("reboot", "relay"):
                    gs.relay.turn_off()
                    time.sleep(5)
                    gs.relay.turn_on()

                case _, ("set_exposure", value):
                    gs.camera.set_exposure(value)

                case ModoAutonomo(), "calibrate_exposure":
                    gs.set_modo(ModoCalibracao(gs, config, "Autonomo"))
                case ModoOdometro(), "calibrate_exposure":
                    gs.set_modo(ModoCalibracao(gs, config, "Odometro"))
                case ModoTempo(), "calibrate_exposure":
                    gs.set_modo(ModoCalibracao(gs, config, "Tempo"))
                case _, "calibrate_exposure":
                    gs.set_modo(ModoCalibracao(gs, config, "Tempo"))

                case _, "start_stream":
                    gs.camera.start_stream()
                case _, "stop_stream":
                    gs.camera.stop_stream()

                case _:
                    gs.modo.handle_event(ev)

        gs.modo.run()


if __name__ == "__main__":
    main()
