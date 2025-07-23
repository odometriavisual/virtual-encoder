class ImuNull:
    def get_orientation(self) -> list[float]:
        return [0, 0, 0, 1]
