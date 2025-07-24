#!/usr/bin/env python
import json
import socket
import threading
import time

from src.modos import ModoAutonomo, ModoDownload, ModoOdometro, ModoTempo
from src.encoder_gs import EncoderGS
from src.webui.server import WebuiApp


def _get_ip(gs: EncoderGS):
    while True:
        gs.get("rpi5")["ip"] = gs.network_interface.get_ip_address()
        time.sleep(30)


def _get_temp(gs: EncoderGS):
    while True:
        temp = gs.thermal_sensors.get_cpu_temp()
        gs.get("rpi5")["temp"] = int(temp) / 1000
        time.sleep(1)


def _get_rpi0_status(gs: EncoderGS):
    while True:
        time.sleep(1.0)
        rpi0_status = gs.client.get_status()
        if rpi0_status:
            gs.set("rpi0", rpi0_status["rpi0"])
            gs.set("camera", rpi0_status["camera"])
            gs.add_message(rpi0_status["msg"])
        else:
            gs.set("rpi0", False)
            gs.set("camera", False)
            gs.set("imu", False)

        camera = "Ok" if gs.get("camera") else "Err."
        rpi_zero = "Ok" if gs.get("rpi0") else "Err."
        imu = "Ok" if gs.get("imu") else "Err."

        gs.display.draw_line(0, f"MODO: {gs.get('modo')}", "center")
        gs.display.draw_line(1, f"ESTADO: {gs.get('estado')}", "center")

        gs.display.draw_line(2, f"IP: {gs.get('rpi5')['ip']}")
        gs.display.draw_line(3, f"CAM : {camera}")
        gs.display.draw_line(4, f"piZ: {rpi_zero} | IMU: {imu}")

        gs.display.update()


def _get_imu_status(gs: EncoderGS):
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
        sock.bind(("", 7101))

        while True:
            message, address = sock.recvfrom(512)

            try:
                imu = json.loads(message)
                if imu:
                    imu = [float(x) for x in imu[1:]]

                    d = sum([x * x for x in imu[:4]])

                    if 0.999 < d < 1.001:
                        gs.set("imu", imu)
                else:
                    gs.set("imu", False)
            except Exception:
                pass


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
    gs = EncoderGS(default_modo_lambda=lambda gs: ModoTempo(gs), debug=True)

    webui = WebuiApp(gs)
    threading.Thread(target=webui.run, daemon=True).start()

    time.sleep(1)

    for task in [_get_ip, _get_temp, _get_rpi0_status, _get_imu_status]:
        threading.Thread(target=task, daemon=True, args=(gs,)).start()

    while True:
        while ev := gs.poll_event():
            match gs.modo, ev:
                case _, ("next_modo", "Autonomo"):
                    gs.set_modo(ModoAutonomo(gs))
                case _, ("next_modo", "Odometro"):
                    gs.set_modo(ModoOdometro(gs))
                case _, ("next_modo", "Tempo"):
                    gs.set_modo(ModoTempo(gs))
                case _, ("next_modo", "Download"):
                    gs.set_modo(ModoDownload(gs))

                case _, ("next_modo", "poweroff"):
                    gs.client.poweroff()
                case _, ("next_modo", "poweroff rpi0"):
                    gs.client.poweroff_rpi0()
                case _, ("next_modo", "poweroff relay"):
                    gs.client.poweroff_relay()
                case _, ("next_modo", "reboot"):
                    gs.client.reboot()
                case _, ("next_modo", "reboot rpi0"):
                    gs.client.reboot_rpi0()
                case _, ("next_modo", "reboot relay"):
                    gs.client.reboot_relay()

                case _, ("set_focus", focus):
                    gs.client.set_focus(focus)
                case _, ("set_exposure", exposure):
                    gs.client.set_exposure(exposure)

                case ModoTempo(), "next_modo":
                    gs.set_modo(ModoAutonomo(gs))
                case ModoAutonomo(), "next_modo":
                    gs.set_modo(ModoTempo(gs))

                case _:
                    gs.modo.handle_event(ev)

        gs.modo.run()


if __name__ == "__main__":
    main()
