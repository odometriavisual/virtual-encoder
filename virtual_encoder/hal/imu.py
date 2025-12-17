import threading
import socket
import json
import time
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from virtual_encoder.encoder_gs import EncoderGS


class ImuNull:
    def get_orientation(self) -> list[float]:
        return [0, 0, 0, 1]

    def start(self):
        pass


class ImuUDP(ImuNull, threading.Thread):
    def __init__(self, gs: "EncoderGS"):
        ImuNull.__init__(self)
        threading.Thread.__init__(self, daemon=True)

        self.gs = gs
        self.orientation = [0, 0, 0, 1]

    def run(self):
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
            sock.bind(("", 7101))

            while True:
                message, address = sock.recvfrom(512)

                try:
                    imu = json.loads(message)
                    if imu:
                        imu = [float(x) for x in imu[1:]]

                        d = sum([x * x for x in imu[:4]])

                        if 0.999 < d < 1.001:
                            self.orientation = imu
                            self.gs.set("imu", imu)
                    else:
                        self.orientation = [0, 0, 0, 1]
                        self.gs.set("imu", False)
                except Exception:
                    pass

    def get_orientation(self) -> list[float]:
        return self.orientation


try:
    import adafruit_bno055
    import board

    class ImuI2C(ImuNull, threading.Thread):
        def __init__(self, gs: "EncoderGS"):
            ImuNull.__init__(self)
            threading.Thread.__init__(self, daemon=True)

            self.gs = gs
            self.orientation = [0, 0, 0, 1]
            self.__condition = threading.Condition()

            i2c = board.I2C()

            try:
                self.__sensor = adafruit_bno055.BNO055_I2C(i2c, 0x28)
            except Exception:
                self.__sensor = adafruit_bno055.BNO055_I2C(i2c, 0x29)

        def run(self):
            while True:
                try:
                    quat = self.__sensor.quaternion
                    acc = self.__sensor.acceleration

                    with self.__condition:
                        self.orientation = [*quat, *acc]
                        self.gs.set("imu", self.orientation)
                        self.__condition.notify_all()

                except Exception:
                    pass

                time.sleep(0.01)

        def get_orientation(self) -> list[float]:
            with self.__condition:
                self.__condition.wait()
                return self.orientation
except Exception:

    class ImuI2C(ImuNull):
        def __init__(self):
            super().__init__()
            raise NotImplementedError
