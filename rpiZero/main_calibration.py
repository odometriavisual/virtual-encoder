from src.localPiZeroClient import LocalPiZeroClient
import time
from src.localCalibration import startLocalCalibration
from src.calibration import CalibrationServer

def main():
    client = LocalPiZeroClient()
    time.sleep(1)

    server = CalibrationServer(client)
    server.run()


if __name__ == '__main__':
    main()