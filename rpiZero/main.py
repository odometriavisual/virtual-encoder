from modos.local_estadocalibracao import Local_EstadoCalibracao
from modos.estadoserver import estadoserver

from src.local_pizeroclient import Local_PiZeroClient
import time

def main():
    client = Local_PiZeroClient()
    time.sleep(1)

    ihm = None #Apenas para não mudar a estrutura original do EstadoCalibracao

    modo = Local_EstadoCalibracao(ihm,client)

    while True:
        modo.run()


if __name__ == '__main__':
    main()
