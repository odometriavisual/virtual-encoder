class PulseGenerator:
    def __init__(self, PIN_A: int, PIN_B: int):
        raise NotImplemented

    def send_pulses(self, count: int):
        for i in range(count):
            print(f"send_pulse: {i}")