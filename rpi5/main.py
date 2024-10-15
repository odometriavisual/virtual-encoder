#!/usr/bin/env python
import time
import threading
from socket import gethostname
from visual_odometer import VisualOdometer

from src.webui.server import WebuiApp
from src.ihm.ihm import IHM
from src.ihm.gpiod_button import GpiodButton
from src.pi_zero_client import PiZeroClient
from src.pulse_generator import PulseGenerator

from src.modos import *

def main():
    """
    OLED: 2 (SDA)
          3 (SCL)
    Push Button 1: 24
    Push Button 2: 27
    Push Button 3: 18

                A,  B
    Encoder 1: 19, 13
    Encoder 2: 26, 23
    Encoder 3:  5,  6

    Rele: 25
    """
    encoders = (
        PulseGenerator(PIN_A=19,PIN_B=13),
        PulseGenerator(PIN_A=26,PIN_B=23),
        PulseGenerator(PIN_A=5,PIN_B=6)
    )

    buttons = (GpiodButton(24), GpiodButton(27), GpiodButton(18))
    odometer = VisualOdometer((640, 480))
    client = PiZeroClient()
    ihm = IHM(client.get_img)

    def check_all_buttons():
        while True:
            if buttons[0].checkButton() is True:
                ihm.send_event("next_modo")
                time.sleep(1)
            if buttons[1].checkButton() is True:
                ihm.send_event("next_estado")
                time.sleep(1)
            if buttons[2].checkButton() is True:
                ihm.send_event("botao3")
                time.sleep(1)
            time.sleep(0.1)
    threading.Thread(target=check_all_buttons, daemon=True).start()

    webui = WebuiApp(ihm.send_event, client.get_img)
    threading.Thread(target=webui.run, daemon=True).start()

    time.sleep(1)

    ihm.rpiZero_status = '...'
    ihm.imu_status = '...'
    ihm.camera_status = '...'
    ihm.update_display()

    ihm.modo = 'TEMPO'
    ihm.ip = f'{gethostname()}.local'

    modo = ModoTempo(client, ihm, encoders)

    def _get_status():
        while True:
            time.sleep(1.0)
            status = client.get_status(ihm.estado)

            ihm.rpiZero_status = 'Ok.' if status['rpiZero'] else 'ERR'
            ihm.imu_status = 'Ok.' if status['imu'] else 'ERR'
            ihm.camera_status = 'Ok.' if status['camera'] else 'ERR'
            ihm.update_display()
    threading.Thread(target=_get_status, daemon=True).start()

    while True:
        while ev := ihm.poll_event():
            match modo, ev:
                case ModoTempo(), 'next_modo':
                    modo = ModoAutonomo(client, ihm, encoders)

                case ModoAutonomo(), 'next_modo':
                    modo = ModoTempo(client, ihm, encoders)

                case _:
                    modo.handle_event(ev)

        modo.run()

if __name__ == '__main__':
    main()
