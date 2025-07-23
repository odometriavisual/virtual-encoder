#!/usr/bin/env python
import threading
import time
import json
import socket

from src.webui.server import WebuiApp
from src.ihm.ihm import IHM
from src.pi_zero_client import PiZeroClient
from src.mount_device_manager import MountDeviceManager
from src.status import EncoderStatus

from src.modos import *
from src.hal.encoder import EncoderNoop
from src.hal.network_interface import NetworkInterfaceNoop
from src.hal.thermal_sensors import get_cpu_temp

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
    encoders = (
        EncoderNoop(),
        EncoderNoop(),
        EncoderNoop()
    )

    status = EncoderStatus()
    client = PiZeroClient(status)
    ihm = IHM(client.get_img, status)

    network_interface = NetworkInterfaceNoop()
    ssd_manager = MountDeviceManager(device="/dev/sda1", mount_point="/media/usb-ssd")

    ssd_manager.mount()
    network_interface.set_ip_address(None)
    ssd_manager.unmount()

    webui = WebuiApp(ihm, status)
    threading.Thread(target=webui.run, daemon=True).start()

    time.sleep(1)

    modo = ModoTempo(client, ihm, status, encoders)
    # modo = ModoOdometro(client, ihm, status, encoders)

    def _get_ip():
        while True:
            status.get('rpi5')['ip'] = network_interface.get_ip_address()
            time.sleep(30)
    threading.Thread(target=_get_ip, daemon=True).start()

    def _get_temp():
        while True:
            temp = get_cpu_temp()
            status.get('rpi5')['temp'] = int(temp) / 1000
            time.sleep(1)
    threading.Thread(target=_get_temp, daemon=True).start()

    def _get_rpi0_status():
        while True:
            time.sleep(1.0)
            rpi0_status = client.get_status()
            if rpi0_status:
                status.set('rpi0', rpi0_status['rpi0'])
                status.set('camera', rpi0_status['camera'])
                status.add_message(rpi0_status['msg'])
            else:
                status.set('rpi0', False)
                status.set('camera', False)
                status.set('imu', False)

            ihm.update_display()
    threading.Thread(target=_get_rpi0_status, daemon=True).start()

    def _get_imu_status():
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
            sock.bind(('', 7101))

            while True:
                message, address = sock.recvfrom(512)

                try:
                    imu = json.loads(message)
                    if imu:
                        imu = [float(x) for x in imu[1:]]

                        d = sum([x*x for x in imu[:4]])

                        if 0.999 < d < 1.001:
                            status.set('imu', imu)
                    else:
                        status.set('imu', False)
                except:
                    pass
    threading.Thread(target=_get_imu_status, daemon=True).start()

    while True:
        while ev := ihm.poll_event():
            match modo, ev:
                case _, ('next_modo', 'Autonomo'):
                    modo.stop()
                    modo = ModoAutonomo(client, status, encoders)
                case _, ('next_modo', 'Odometro'):
                    modo.stop()
                    modo = ModoOdometro(client, ihm, status, encoders)
                case _, ('next_modo', 'Tempo'):
                    modo.stop()
                    modo = ModoTempo(client, ihm, status, encoders)
                case _, ('next_modo', 'Download'):
                    modo.stop()
                    modo = ModoDownload(client, ihm, status, ssd_manager)

                case _, ('next_modo', 'poweroff'):
                    client.poweroff()
                case _, ('next_modo', 'poweroff rpi0'):
                    client.poweroff_rpi0()
                case _, ('next_modo', 'poweroff relay'):
                    client.poweroff_relay()
                case _, ('next_modo', 'reboot'):
                    client.reboot()
                case _, ('next_modo', 'reboot rpi0'):
                    client.reboot_rpi0()
                case _, ('next_modo', 'reboot relay'):
                    client.reboot_relay()

                case _, ('set_focus', focus):
                    client.set_focus(focus)
                case _, ('set_exposure', exposure):
                    client.set_exposure(exposure)

                case ModoTempo(), 'next_modo':
                    modo.stop()
                    modo = ModoAutonomo(client, status, encoders)
                case ModoAutonomo(), 'next_modo':
                    modo.stop()
                    modo = ModoTempo(client, ihm, status, encoders)

                case _:
                    modo.handle_event(ev)

        modo.run()

if __name__ == '__main__':
    main()
