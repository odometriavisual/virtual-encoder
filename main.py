#!/usr/bin/env python
import threading
import time

from virtual_encoder.virtual_encoder import VirtualEncoder
from virtual_encoder.server import WebuiApp
from virtual_encoder.config import Config


def _get_ip(ve: VirtualEncoder):
    while True:
        ips = ve.network_interface.get_ip_addresses()

        if len(ips) > 0:
            for ip in ips:
                ve.get("rpi5")["ip"] = ip
                time.sleep(30 / len(ips))

        else:
            ve.get("rpi5")["ip"] = "OFFLINE"
            time.sleep(30)


def _get_temp(ve: VirtualEncoder):
    while True:
        ve.get("rpi5")["temp"] = ve.thermal_sensors.get_cpu_temp()
        time.sleep(1)


def main():
    config = Config.load()
    ve = VirtualEncoder(config)

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
