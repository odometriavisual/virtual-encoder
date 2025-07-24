import threading
import socket
import json

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from ..encoder_gs import EncoderGS


class ImuNull:
    def get_orientation(self) -> list[float]:
        return [0, 0, 0, 1]


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
