import time
from visual_odometer import VisualOdometer

from ihm import IHM
from pi_zero_client import PiZeroClient
from pulse_generator import PulseGenerator
from estados import *

def main():
    """
    OLED: 2 (SDA)
          3 (SCL)
    Push Button 1: 18
    Push Button 2: 27
    Push Button 3: 24

                A,  B
    Encoder 1: 19, 13
    Encoder 2: 26, 16
    Encoder 3:  5,  6
    """
    client = PiZeroClient()

    ihm = IHM(client.get_img)
    ihm.start_listening()

    odometer = VisualOdometer((640, 480))
    encoders = (
        PulseGenerator(PIN_A=19,PIN_B=13),
        PulseGenerator(PIN_A=26,PIN_B=16),
        PulseGenerator(PIN_A=5,PIN_B=6)
    )

    time.sleep(1)

    estado = EstadoSet(ihm)
    next_estado = None

    while True:
        while next_estado is None:
            while ev := ihm.poll_event():
                match (estado, ev):
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
