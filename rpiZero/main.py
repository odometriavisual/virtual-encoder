from src.localPiZeroClient import LocalPiZeroClient
from src.server import Server
import time
from src.localCalibration import startLocalCalibration
import cv2

def main():
    client = LocalPiZeroClient()
    time.sleep(1)

    startLocalCalibration(client, 0, 15, 1)


    img = client.get_img()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret, corners = cv2.findChessboardCorners(gray,  patternSize=(7, 7), corners=None)

    if ret:
        point1 = corners[0][0]  # Ponto no topo à esquerda
        point2 = corners[6][0]  # Ponto no topo à direita
        print(point1)
        print(point2)


    server = Server(client)
    server.run()


if __name__ == '__main__':
    main()