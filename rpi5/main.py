from ihm import IHM
from pi_zero_client import PiZeroClient
from pulse_generator import PulseGenerator
from visual_odometer import VisualOdometer

from modos import *

import time

def main():
    client = PiZeroClient()

    ihm = IHM(client.get_img)
    ihm.start_listening()

    odometer = VisualOdometer((640, 480))

    encoder_1 = PulseGenerator(PIN_A=5,PIN_B=6)
    #encoder_2 = PulseGenerator(PIN_A=17,PIN_B=27)
    # encoder_3 = PulseGenerator(PIN_A=23,PIN_B=24)

    time.sleep(1)

    estado = EstadoSet()
    next_estado = None

    while True:
        while next_estado is None:
            while ev := ihm.poll_event():
                match (estado, ev):
                    case (EstadoSet(), 'botao2'):
                        print('Transicao: Set -> Calibracao')
                        next_estado = EstadoCalibracao(client, next_estado=EstadoReady())
                    case (EstadoReady(), 'botao2'):
                        print('Transicao: Ready -> Disparo')
                        next_estado = EstadoDisparo(encoder_1)

                    case (_, ('set_focus', focus)):
                        client.set_focus(focus)

            if next_estado is None:
                next_estado = estado.run()

        estado, next_estado = next_estado, None


if __name__ == '__main__':
    main()
