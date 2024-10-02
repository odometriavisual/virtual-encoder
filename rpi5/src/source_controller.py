import gpiod
from gpiod.line import Direction, Value
import time

class SourceController:
    def __init__(self, PIN: int = 25, chip: str = "/dev/gpiochip4"):
        self.PIN = PIN
        self.LINE = gpiod.request_lines(
            chip,
            consumer="relay",
            config={
                self.PIN: gpiod.LineSettings(
                    direction=Direction.OUTPUT, output_value=Value.INACTIVE
                )
            },
        )

    #Observação, o rpi0 foi colocado na conexão NF (normalmente fechado), por isso a lógica de ligar e desligar deve ser invertida
    def turn_on(self):
        self.LINE.set_value(self.PIN, Value.INACTIVE)
    def turn_off(self):
        self.LINE.set_value(self.PIN, Value.ACTIVE)
