import gpiod
from gpiod.line import Direction, Value, Bias

class GpiodButton:
    def __init__(self, pin: int):
        self.pin = pin
        self.lines = gpiod.request_lines(
            "/dev/gpiochip4",
            consumer="button",
            config={
                self.pin: gpiod.LineSettings(
                    direction=Direction.INPUT,
                    bias=Bias.PULL_UP
                )
            },
        )

    def checkButton(self) -> bool:
        if self.lines.get_value(self.pin) == Value.INACTIVE:
            return True
        else:
            return False