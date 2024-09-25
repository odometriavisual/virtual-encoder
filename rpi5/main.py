#!/usr/bin/env python

import time
from visual_odometer import VisualOdometer

from src.modos.modo_tempo import ModoTempo
from src.ihm.ihm import IHM
from src.ihm.gpiod_button import GpiodButton
from src.pi_zero_client import PiZeroClient
from src.pulse_generator import PulseGenerator
from src.estados import *

def main():
    """
    OLED: 2 (SDA)
          3 (SCL)
    Push Button 1: 24
    Push Button 2: 27
    Push Button 3: 18

                A,  B
    Encoder 1: 19, 13
    Encoder 2: 26, 16
    Encoder 3:  5,  6
    """
    encoders = (
        PulseGenerator(PIN_A=19,PIN_B=13),
        PulseGenerator(PIN_A=26,PIN_B=16),
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

    ihm.start_listening([check_all_buttons, ihm.flask_interface.run])

    time.sleep(1)

    ihm.modo = 'TEMPO'
    ihm.ip = 'NOT.IMPL.'
    ihm.pizero_status = 'NOT.IMPL'

    modo = ModoTempo(client, ihm, encoders)

    while True:
        while ev := ihm.poll_event():
            match modo, ev:
                case ModoTempo(), 'next_modo':
                    modo = ModoTempo(client, ihm, encoders)

                case _, _:
                    modo.handle_event(ev)

        modo.run()

if __name__ == '__main__':
    main()
