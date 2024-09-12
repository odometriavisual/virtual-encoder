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
import modos

def main():
    ihm = IHM()
    ihm.start_listening()

    # client = PiZeroClient()
    # vid = client.get_mjpeg_stream()

    estado = modos.ModoHabilitado()
    next_estado = None

    while True:
        while next_estado is None:
            while ev := ihm.poll_event():
                if ev == 'modo_disparo':
                    next_estado = modos.ModoDisparo()
                elif ev == 'modo_ativado':
                    next_estado = modos.ModoAtivado(None)
                elif ev == 'modo_habilitado':
                    next_estado = modos.ModoHabilitado()

            estado.run()

        estado, next_estado = next_estado, None


if __name__ == '__main__':
    main()