from picamera2 import Picamera2
import adafruit_bno055
import board
import time, json

from src.localPiZeroClient import LocalPiZeroClient
from src.localCalibration import load_or_recalibrate
from src.server import Server
from src.log import Logger

from picamera2.encoders import MJPEGEncoder
from picamera2.outputs import FileOutput
import socket, threading

def start_imu_stream(client, logger):
    def _start():
        while True:
            with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
                sock.connect(("rpi5", 7101))
                measure = client.get_orientation()
                logger.orientations_queue.put(measure, block=False)
                sock.send(json.dumps(measure).encode('utf-8'))
            time.sleep(0.02)

    threading.Thread(target=_start, daemon=True).start()

def start_camera_stream(picam):
    def _listen():
        encoder = MJPEGEncoder(2_000_000)

        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
            sock.connect(("rpi5", 7100))
            stream = sock.makefile("wb")
            picam.start_recording(encoder, FileOutput(stream))

        while True:
            time.sleep(36000)

    threading.Thread(target=_listen, daemon=True).start()

def main():
    picam = Picamera2()
    picam.configure(picam.create_preview_configuration({'format': 'RGB888', "size": (640//2, 480//2)}))
    picam.controls.FrameRate = 60  # Ajusta o FPS

    start_camera_stream(picam)

    try:
        imu = adafruit_bno055.BNO055_I2C(board.I2C(), 0x29)
    except :
        imu = None

    logger = Logger()
    client = LocalPiZeroClient(picam, imu, logger)
    logger.client = client

    time.sleep(1)

    start_imu_stream(client, logger)

    load_or_recalibrate(client)
    logger.start()

    server = Server(client)
    server.run()


if __name__ == '__main__':
    main()
