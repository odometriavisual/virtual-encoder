#!/usr/bin/env python

import time
from visual_odometer import VisualOdometer

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
                ihm.send_event("botao1")
                time.sleep(1)
            if buttons[1].checkButton() is True:
                ihm.send_event("botao2")
                time.sleep(1)
            if buttons[2].checkButton() is True:
                ihm.send_event("botao3")
                time.sleep(1)
            time.sleep(0.1)

    ihm.start_listening([check_all_buttons, ihm.flask_interface.run])

    time.sleep(1)

    estado = EstadoSet(ihm)
    next_estado = None

    while True:
        while next_estado is None:
            while ev := ihm.poll_event():
                match (estado, ev):
                    case (EstadoSet(), 'botao1'):
                        print('Transicao: Set -> Disparo')
                        next_estado = EstadoDisparo(ihm, encoders)
                    case (EstadoDisparo(), 'botao1'):
                        print('Transicao: Disparo -> Set')
                        next_estado = EstadoSet(ihm)

                    case (EstadoSet(), 'botao2'):
                        print('Transicao: Set -> Calibracao')
                        next_estado = EstadoCalibracao(ihm, client)
                    case (EstadoReady(), 'botao2'):
                        print('Transicao: Ready -> Disparo')
                        next_estado = EstadoDisparo(ihm, encoders)
                    case (EstadoDisparo(), 'botao2'):
                        print('Transicao: Disparo -> Set')
                        next_estado = EstadoSet(ihm)

                    case (_, ('set_focus', focus)):
                        client.set_focus(focus)

            if next_estado is None:
                next_estado = estado.run()

        estado, next_estado = next_estado, None

if __name__ == '__main__':
    main()
