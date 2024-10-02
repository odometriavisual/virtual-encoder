#!/usr/bin/env python

import time
from socket import gethostname
from visual_odometer import VisualOdometer

from src.log.imu_logger import IMULogger
from src.ihm.ihm import IHM
from src.ihm.gpiod_button import GpiodButton
from src.pi_zero_client import PiZeroClient
from src.pulse_generator import PulseGenerator
from src.relay import Relay

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

    relay = Relay(PIN=25)
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

    ihm.start_listening([check_all_buttons, ihm.flask_interface.run])

    time.sleep(1)

    ihm.modo = 'TEMPO'
    ihm.ip = f'{gethostname()}.local'
    ihm.pizero_status = 'Ok.' if client.is_network_up() else 'Not found.'

    imu_logger = IMULogger('/home/pi/imu.npy')
    imu_logger.listen(client)

    modo = ModoTempo(client, ihm, encoders)
    time_now = time.monotonic_ns()
    next_display_update = time_now + 5e9

    while True:
        time_now = time.monotonic_ns()
        if time_now > next_display_update:
            next_display_update = next_display_update + 5e9
            ihm.pizero_status = 'Ok.' if client.is_network_up() else 'Not found.'
            ihm.update_display()

        while ev := ihm.poll_event():
            match modo, ev:
                case ModoTempo(), 'next_modo':
                    modo = ModoAutonomo(client, ihm, encoder, relay)

                case ModoAutonomo(), 'next_modo':
                    modo = ModoTempo(client, ihm, encoders, relay)

                case _:
                    modo.handle_event(ev)

        modo.run()

if __name__ == '__main__':
    main()
