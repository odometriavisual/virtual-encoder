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
            self.scl = i2c_scl
            self.sda = i2c_sda
            self.addr = addr

            self.retry_interval = 4
            
            self.is_connected = False
            self.__connect()


        def __connect(self):
            try:
                # Inicializa o display I2C
                i2c = busio.I2C(self.scl, self.sda)
                self.oled_i2c = adafruit_ssd1306.SSD1306_I2C(self.width, self.height, i2c, addr=self.addr)

                # Limpa o display
                self.clear()

                # Cria a imagem em branco para desenhar
                self.image = Image.new("1", (self.oled_i2c.width, self.oled_i2c.height))
                self.draw = ImageDraw.Draw(self.image)

                # Carrega a fonte padrão
                self.font = ImageFont.load_default()

                self.is_connected = True
                self.retry_interval = 4
            except Exception:
                self.is_connected = False
                self.retry_interval = min(self.retry_interval*2, 3600)
            

        def run(self):
            while True:
                self.gs.set("display", self.is_connected)

                version = self.gs.get("version")
                camera = "Ok" if self.gs.get("camera") else "Err."
                imu = "Ok" if self.gs.get("imu") else "Err."

                self.draw_line(0, f"MODO: {self.gs.get('modo')}", "center")
                self.draw_line(1, f"ESTADO: {self.gs.get('estado')}", "center")

                self.draw_line(2, f"IP: {self.gs.get('rpi5')['ip']}")
                self.draw_line(3, f"CAM : {camera} | IMU: {imu}")
                self.draw_line(4, f"Versao: {version}")

                self.update()
                time.sleep(5)

        def clear(self):
            try:
                self.oled_i2c.fill(0)
                self.oled_i2c.show()
            except Exception:
                pass

        def draw_line(self, line: int, text: str, align: str = "left"):
            line_height = 12  # Altura da linha em pixels (ajustável)
            y_position = line * line_height

            try:
                # Limpa a linha especificada
                self.draw.rectangle(
                    (0, y_position, self.width, y_position + line_height), outline=0, fill=0
                )
                # Desenha o texto
                self.draw.text((0, y_position), text, align=align, font=self.font, fill=255)
            except Exception:
                pass

        def update(self):
            try:
                self.oled_i2c.image(self.image)
                self.oled_i2c.show()
            except Exception:
                time.sleep(self.retry_interval)
                self.__connect()
except Exception:

    class DisplaySSD1306(DisplayNull):
        def __init__(self):
            super().__init__()
            raise NotImplementedError
