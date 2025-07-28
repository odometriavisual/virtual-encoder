from picamera2 import Picamera2
import adafruit_bno055
import board
import time

from src.local_pi_zero_client import LocalPiZeroClient
from src.server import create_app
from src.log import Logger


def main():
    picam = Picamera2()
    picam.configure(
        picam.create_preview_configuration(
            {"format": "RGB888", "size": (640 // 2, 480 // 2)}
        )
    )
    picam.controls.FrameRate = 60  # Ajusta o FPS

    imu = adafruit_bno055.BNO055_I2C(board.I2C(), 0x29)

    logger = Logger()
    client = LocalPiZeroClient(picam, imu, logger)
    logger.client = client

    time.sleep(1)

    client.start_camera_stream()
    client.start_imu_stream()

    logger.start()

    server = create_app(client)
    server.run(host="0.0.0.0", port=7123)


if __name__ == "__main__":
    main()
