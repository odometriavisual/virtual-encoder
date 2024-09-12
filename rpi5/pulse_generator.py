import gpiod
from gpiod.line import Direction, Value

class PulseGenerator:
    sequenceArray = [[Value.ACTIVE, Value.ACTIVE], [Value.ACTIVE, Value.INACTIVE], [Value.INACTIVE, Value.INACTIVE], [Value.INACTIVE, Value.ACTIVE]]

    def __init__(self, PIN_A: int, PIN_B: int, chip: str = "/dev/gpiochip4"):
        self.positionReference = 0
        self.PIN_A = PIN_A
        self.PIN_B = PIN_B
        self.LINES = gpiod.request_lines(
            chip,
            consumer="pulse-generator",
            config={
                self.PIN_A: gpiod.LineSettings(
                    direction=Direction.OUTPUT, output_value=self.sequenceArray[self.positionReference][0]
                ),
                self.PIN_B: gpiod.LineSettings(
                    direction=Direction.OUTPUT, output_value=self.sequenceArray[self.positionReference][1]
                )
            },
        )


    def send_pulses(self, count: int):
        if count > 0:
            pulseDirectionMultiplier = 1
        else:
            pulseDirectionMultiplier = -1

        absoluteCount = abs(count)

        for i in range(absoluteCount):
            self.positionReference = (self.positionReference + pulseDirectionMultiplier)%4
            self.LINES.set_value(self.PIN_A,self.sequenceArray[self.positionReference][0])
            self.LINES.set_value(self.PIN_B,self.sequenceArray[self.positionReference][1])