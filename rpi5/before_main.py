from src.ihm.display import Screen

if __name__ == '__main__':
    screen = Screen()
    screen.clear()
    screen.drawLine(2, 'Inicializando...')
    screen.update()
