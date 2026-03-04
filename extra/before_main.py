try:
    from src.hal.display import DisplaySSD1306

    if __name__ == "__main__":
        screen = DisplaySSD1306(None)
        screen.clear()
        screen.draw_line(2, "Inicializando...")
        screen.update()
except Exception:
    pass
