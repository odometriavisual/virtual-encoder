#!/usr/bin/env python
import threading, time, json, socket

from src.network_manager import NetworkManager
from src.webui.server import WebuiApp
from src.ihm.ihm import IHM
from src.pi_zero_client import PiZeroClient
from src.pulse_generator import PulseGenerator
from src.mount_device_manager import MountDeviceManager
from src.logger import Logger
from src.status import EncoderStatus

from src.modos import *

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
        PulseGenerator(PIN_A=26, PIN_B=19),
        PulseGenerator(PIN_A=5, PIN_B=23),
        PulseGenerator(PIN_A=6, PIN_B=13)
    )

    status = EncoderStatus()
    client = PiZeroClient(status)
    ihm = IHM(client.get_img, status)

    net_manager = NetworkManager()
    ssd_manager = MountDeviceManager(device="/dev/sda1", mount_point="/media/usb-ssd")

    ssd_manager.mount()
    net_manager.update_address()
    ssd_manager.unmount()

    webui = WebuiApp(ihm, status)
    threading.Thread(target=webui.run, daemon=True).start()

    time.sleep(1)

    modo = ModoTempo(client, ihm, status, encoders)

    logger = Logger(modo)

    def _get_ip():
        while True:
            status.get('rpi5')['ip'] = net_manager.get_ip('eth1')
            time.sleep(30)
    threading.Thread(target=_get_ip, daemon=True).start()

    def _get_temp():
        while True:
            with open('/sys/class/thermal/thermal_zone0/temp', 'r') as file:
                temp = file.read()
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
                    modo = ModoOdometro(client, ihm, status, encoders, logger)
                case _, ('next_modo', 'Tempo'):
                    modo.stop()
                    modo = ModoTempo(client, ihm, status, encoders)
                case _, ('next_modo', 'Download'):
                    modo.stop()
                    modo = ModoDownload(client, ihm, status, ssd_manager)

                case _, ('next_modo', 'poweroff'):
                    client.poweroff()
                case _, ('next_modo', 'reboot'):
                    client.reboot()

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
