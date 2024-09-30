from src.localPiZeroClient import LocalPiZeroClient
from src.server import Server
import time
from src.localCalibration import startLocalCalibration
import cv2

def main():
    client = LocalPiZeroClient()
    time.sleep(1)

    #startLocalCalibration(client, 0, 15, 1)

    server = Server(client)
    server.run()




if __name__ == '__main__':
    main()