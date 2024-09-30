from src.localPiZeroClient import LocalPiZeroClient
from src.server import Server
import time
from src.localCalibration import startLocalCalibration


def main():
    client = LocalPiZeroClient()
    time.sleep(1)

    startLocalCalibration(client)

    server = Server(client)
    server.run()


if __name__ == '__main__':
    main()