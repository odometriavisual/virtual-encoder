import threading
import time

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from virtual_encoder.encoder_gs import EncoderGS


class DisplayNull:
    def clear(self):
        pass

    def draw_line(self, line: int, text: str, align: str = "left"):
        pass

    def update(self):
        pass


try:
    import busio
    import adafruit_ssd1306
    from PIL import Image, ImageDraw, ImageFont

    class DisplaySSD1306(DisplayNull, threading.Thread):
        def __init__(
            self, gs: "EncoderGS", width=128, height=64, i2c_scl=3, i2c_sda=2, addr=0x3C
        ):
            DisplayNull.__init__(self)
            threading.Thread.__init__(self, daemon=True)

            self.gs = gs

            self.width = width
            self.height = height

            # Inicializa o display I2C
            i2c = busio.I2C(i2c_scl, i2c_sda)
            self.oled_i2c = adafruit_ssd1306.SSD1306_I2C(width, height, i2c, addr=addr)

            # Limpa o display
            self.clear()

            # Cria a imagem em branco para desenhar
            self.image = Image.new("1", (self.oled_i2c.width, self.oled_i2c.height))
            self.draw = ImageDraw.Draw(self.image)

            # Carrega a fonte padrão
            self.font = ImageFont.load_default()

        def run(self):
            while True:
                camera = "Ok" if self.gs.get("camera") else "Err."
                rpi_zero = "Ok" if self.gs.get("rpi0") else "Err."
                imu = "Ok" if self.gs.get("imu") else "Err."

                self.draw_line(0, f"MODO: {self.gs.get('modo')}", "center")
                self.draw_line(1, f"ESTADO: {self.gs.get('estado')}", "center")

                self.draw_line(2, f"IP: {self.gs.get('rpi5')['ip']}")
                self.draw_line(3, f"CAM : {camera}")
                self.draw_line(4, f"piZ: {rpi_zero} | IMU: {imu}")

                self.update()
                time.sleep(5)

        def clear(self):
            self.oled_i2c.fill(0)
            self.oled_i2c.show()

        def draw_line(self, line: int, text: str, align: str = "left"):
            line_height = 12  # Altura da linha em pixels (ajustável)
            y_position = line * line_height

            # Limpa a linha especificada
            self.draw.rectangle(
                (0, y_position, self.width, y_position + line_height), outline=0, fill=0
            )
            # Desenha o texto
            self.draw.text((0, y_position), text, align=align, font=self.font, fill=255)

        def update(self):
            self.oled_i2c.image(self.image)
            self.oled_i2c.show()
except Exception:

    class DisplaySSD1306(DisplayNull):
        def __init__(self):
            super().__init__()
            raise NotImplementedError
