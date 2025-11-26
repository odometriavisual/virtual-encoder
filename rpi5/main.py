#!/usr/bin/env python
import threading
import time
import subprocess

from src.modos import ModoAutonomo, ModoDownload, ModoOdometro, ModoTempo
from src.encoder_gs import EncoderGS
from src.webui.server import WebuiApp


def _get_ip(gs: EncoderGS):
    while True:
        gs.get("rpi5")["ip"] = gs.network_interface.get_ip_address()
        time.sleep(30)


def _get_temp(gs: EncoderGS):
    while True:
        gs.get("rpi5")["temp"] = gs.thermal_sensors.get_cpu_temp()
        time.sleep(1)


def main():
    """
    OLED: 2 (SDA)
          3 (SCL)

                A,  B
    Encoder 1: 26, 19
    Encoder 2:  5, 23
    Encoder 3:  6, 13

    Rele: 25
    """
    gs = EncoderGS(default_modo_lambda=lambda gs: ModoTempo(gs), debug=False)

    webui = WebuiApp(gs)
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

                case ModoAutonomo(), ("set_modo", "Download"):
                    gs.set_modo(ModoDownload(gs, next_modo="Autonomo"))
                case ModoTempo(), ("set_modo", "Download"):
                    gs.set_modo(ModoDownload(gs, next_modo="Tempo"))
                case ModoOdometro(), ("set_modo", "Download"):
                    gs.set_modo(ModoDownload(gs, next_modo="Odometro"))

                case _, ("shutdown", "all"):
                    gs.pi_zero_api.poweroff_rpi0()
                    try:
                        subprocess.run(["sudo", "poweroff"])
                    except subprocess.SubprocessError:
                        pass
                case _, ("shutdown", "camera"):
                    gs.pi_zero_api.poweroff_rpi0()
                case _, ("shutdown", "relay"):
                    gs.relay.turn_off()

                case _, ("reboot", "all"):
                    gs.pi_zero_api.reboot()
                    try:
                        subprocess.run(["sudo", "reboot"])
                    except subprocess.SubprocessError:
                        pass
                case _, ("reboot", "camera"):
                    gs.pi_zero_api.reboot_rpi0()
                case _, ("reboot", "relay"):
                    gs.relay.turn_off()
                    time.sleep(5)
                    gs.relay.turn_on()

                case _, ("set_exposure", value):
                    gs.pi_zero_api.set_exposure(value)

                case _, "start_stream":
                    gs.camera.start_stream()
                case _, "stop_stream":
                    gs.camera.stop_stream()

                case _:
                    gs.modo.handle_event(ev)

        gs.modo.run()


if __name__ == "__main__":
    main()
