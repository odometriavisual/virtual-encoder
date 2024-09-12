import RPi.GPIO as gpio

class PulseGenerator:
    sequenceArray = [[gpio.HIGH, gpio.HIGH], [gpio.HIGH, gpio.LOW], [gpio.LOW, gpio.LOW], [gpio.LOW, gpio.HIGH]]

    def __init__(self, PIN_A: int, PIN_B: int):
        self.PIN_A = PIN_A
        self.PIN_B = PIN_B
        self.positionReference = 0

        gpio.setup(self.PIN_A, gpio.OUT)
        gpio.setup(self.PIN_B, gpio.OUT)

    def send_pulses(self, count: int):
        if count > 0:
            pulseDirectionMultiplier = 1
        else:
            pulseDirectionMultiplier = -1

        absoluteCount = abs(count)

        for i in range(absoluteCount):
            self.positionReference = (self.positionReference + pulseDirectionMultiplier)%4

            gpio.output(self.PIN_A,self.sequenceArray[self.positionReference][0])
            gpio.output(self.PIN_B,self.sequenceArray[self.positionReference][1])

