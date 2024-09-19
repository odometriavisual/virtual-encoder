'''
# Exemplo de uso

display = Screen()
while True:
    display.drawLine(0, "Linha 1")
    display.drawLine(1, "Linha 2")
    display.update()
    time.sleep(1)
'''

import busio
import adafruit_ssd1306
from PIL import Image, ImageDraw, ImageFont

class Screen:
    def __init__(self, width:int=128, height:int=64, i2c_scl:int=3, i2c_sda:int=2, addr=0x3C):
        self.width = width
        self.height = height

        # Inicializa o display I2C
        i2c = busio.I2C(i2c_scl, i2c_sda)
        self.oled = adafruit_ssd1306.SSD1306_I2C(width, height, i2c, addr=addr)

        # Limpa o display
        self.oled.fill(0)
        self.oled.show()

        # Cria a imagem em branco para desenhar
        self.image = Image.new("1", (self.oled.width, self.oled.height))
        self.draw = ImageDraw.Draw(self.image)

        # Carrega a fonte padrão
        self.font = ImageFont.load_default()

    def drawLine(self, line: int, text: str):
        line_height = 12  # Altura da linha em pixels (ajustável)
        y_position = line * line_height

        # Limpa a linha especificada
        self.draw.rectangle((0, y_position, self.width, y_position + line_height), outline=0, fill=0)
        # Desenha o texto
        self.draw.text((0, y_position), text, font=self.font, fill=255)

    def update(self):
        self.oled.image(self.image)
        self.oled.show()



