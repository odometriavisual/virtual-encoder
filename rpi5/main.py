'''
    Estados:
        - Modo disparo:
            - pulse generators
            - input
        - Modo Habilitado: calibração foco + exposição
            - pizeroclient
            - input

        - Modo Ativado: stream MJPEG | preprocessing | odometer | pulser
            - pizeroclient
            - pulse generators
            - input

'''

from ihm import IHM
from pi_zero_client import PiZeroClient
import modos
from rpi5.pulse_generator import PulseGenerator


def main():
    ihm = IHM()
    ihm.start_listening()

    client = PiZeroClient()
    vid = client.get_mjpeg_stream()

    encoder_1 = PulseGenerator(PIN_A=5,PIN_B=6)
    #encoder_2 = PulseGenerator(PIN_A=17,PIN_B=27)
    #encoder_3 = PulseGenerator(PIN_A=23,PIN_B=24)

    estado = modos.ModoHabilitado()
    next_estado = None

    while True:
        while next_estado is None:
            while ev := ihm.poll_event():
                match ev:
                    case 'modo_disparo':
                        next_estado = modos.ModoDisparo(encoder = encoder_1)
                    case 'modo_ativado':
                        next_estado = modos.ModoAtivado(None)
                    case 'modo_habilitado':
                        next_estado = modos.ModoHabilitado()

                    case ('set_focus', focus):
                        client.set_focus(focus)

            estado.run()

        estado, next_estado = next_estado, None


if __name__ == '__main__':
    main()