class EncoderNull:
    def send_pulse(self, direction="+"):
        pass


try:
    import gpiod
    from gpiod.line import Direction, Value

    class EncoderGPIO(EncoderNull):
        def __init__(self, PIN_A: int, PIN_B: int, chip: str = "/dev/gpiochip4"):
            super().__init__()

            self.sequenceArray = [
                [Value.ACTIVE, Value.ACTIVE],
                [Value.ACTIVE, Value.INACTIVE],
                [Value.INACTIVE, Value.INACTIVE],
                [Value.INACTIVE, Value.ACTIVE],
            ]
            self.positionReference = 0
            self.PIN_A = PIN_A
            self.PIN_B = PIN_B
            self.LINES = gpiod.request_lines(
                chip,
                consumer="pulse-generator",
                config={
                    self.PIN_A: gpiod.LineSettings(
                        direction=Direction.OUTPUT,
                        output_value=self.sequenceArray[self.positionReference][0],
                    ),
                    self.PIN_B: gpiod.LineSettings(
                        direction=Direction.OUTPUT,
                        output_value=self.sequenceArray[self.positionReference][1],
                    ),
                },
            )

            self.LINES.set_value(
                self.PIN_A, self.sequenceArray[self.positionReference][0]
            )
            self.LINES.set_value(
                self.PIN_B, self.sequenceArray[self.positionReference][1]
            )

        def send_pulse(self, direction="+"):
            if direction == "+":
                pulseDirectionMultiplier = 1
            else:
                pulseDirectionMultiplier = -1

            self.positionReference = (
                self.positionReference + pulseDirectionMultiplier
            ) % 4
            self.LINES.set_value(
                self.PIN_A, self.sequenceArray[self.positionReference][0]
            )
            self.LINES.set_value(
                self.PIN_B, self.sequenceArray[self.positionReference][1]
            )
except Exception:

    class EncoderGPIO(EncoderNull):
        def __init__(self):
            super().__init__()
            raise NotImplementedError
