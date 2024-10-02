import gpiod
from gpiod.line import Direction, Value
import time

class Relay:
    def __init__(self, PIN: int = 25, chip: str = "/dev/gpiochip4"):
        self.PIN = PIN
        self.LINE = gpiod.request_lines(
            chip,
            consumer="pulse-generator",
            config={
                self.PIN: gpiod.LineSettings(
                    direction=Direction.OUTPUT, output_value=Value.INACTIVE
                )
            },
        )

    def enable(self):
        self.LINE.set_value(self.PIN, Value.ACTIVE)
    def disable(self):
        self.LINE.set_value(self.PIN, Value.INACTIVE)

#Apenas para testes
relay = Relay(PIN=25)
while True:
    relay.enable()
    time.sleep(1)
    relay.disable()
    time.sleep(1)