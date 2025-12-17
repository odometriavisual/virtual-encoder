from src.hal.display import DisplaySSD1306

if __name__ == "__main__":
    screen = DisplaySSD1306(None)
    screen.clear()
    screen.draw_line(0, "Desligando...")
    screen.draw_line(2, "Aguarde 30 segundos")
    screen.draw_line(3, "antes de desconectar")
    screen.draw_line(4, "cabos de energia")
    screen.update()
