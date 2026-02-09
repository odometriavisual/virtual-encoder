class LedNull:
    def turn_off(self):
        pass

    def turn_on(self):
        pass


try:
    import gpiod
    from gpiod import LineRequest
    from gpiod.line import Direction, Value

    class LedSerdes(LedNull):
        def __init__(self, pin: int, chip: str = "/dev/gpiochip0"):
            self.__pin = pin
            self.__chip = chip

            self.__gpio: LineRequest = gpiod.request_lines(
                self.__chip,
                {
                    self.__pin: gpiod.LineSettings(
                        direction=Direction.OUTPUT, output_value=Value.INACTIVE
                    )
                },
                "Leds",
            )

        def turn_off(self):
            self.__gpio.set_value(self.__pin, Value.ACTIVE)

        def turn_on(self):
            self.__gpio.set_value(self.__pin, Value.INACTIVE)
except Exception:

    class LedSerdes(LedNull):
        def __init__(self):
            super().__init__()
            raise NotImplementedError
