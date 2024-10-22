from picamera2 import Picamera2
import time
import adafruit_bno055
import board

from src.localPiZeroClient import LocalPiZeroClient
from src.calibration.calibration_server import CalibrationServer

def main():
    picam = Picamera2()
    picam.configure(picam.create_preview_configuration({'format': 'RGB888', "size": (640, 480)}))
    picam.controls.FrameRate = 60  # Ajusta o FPS
    picam.start()

    try:
        imu = adafruit_bno055.BNO055_I2C(board.I2C(), 0x29)
    except :
        imu = None

    client = LocalPiZeroClient(picam, imu)
    time.sleep(1)

    server = CalibrationServer(client)
    server.run()


if __name__ == '__main__':
    main()
