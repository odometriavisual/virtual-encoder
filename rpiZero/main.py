import threading
import csv
from picamera2 import Picamera2
import adafruit_bno055
import board
import time
from os.path import isfile
from cv2 import imwrite

from src.localPiZeroClient import LocalPiZeroClient
from src.server import Server

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

    def _save_imgs():
        while True:
            client.frame_available.wait()
            frame = client.get_img()

            time_now = time.monotonic_ns()

            if time_now > client.last_status_time + client.enable_save_period or client.enable_save:
                imgs_directory = '/home/pi/picam_imgs'
                filename = f'{imgs_directory}/{time.time_ns()}.jpg'
                imwrite(filename, frame)

    threading.Thread(target=_save_imgs, daemon=True).start()

    def _save_orientations():
        path = '/home/pi/imu.csv'

        if not isfile(path):
            with open(path, mode='w', newline='') as file:
                writer = csv.writer(file)
                writer.writerow(["timestamp","boot_time","qx","qy","qz","qw"])

        while True:
            time.sleep(1)
            time_now = time.monotonic_ns()

            if time_now > client.last_status_time + client.enable_save_period or client.enable_save:
                measure = client.get_orientation()
                with open(path, mode='a', newline='') as file:
                    writer = csv.writer(file)
                    writer.writerow(list(measure))

    threading.Thread(target=_save_orientations, daemon=True).start()

    server = Server(client)
    server.run()

if __name__ == '__main__':
    main()