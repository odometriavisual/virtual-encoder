from src.ihm.display import Screen

if __name__ == '__main__':
    screen = Screen()
    screen.clear()
    screen.drawLine(0, 'Desligando...')
    screen.drawLine(2, 'Aguarde 30 segundos')
    screen.drawLine(3, 'antes de desconectar')
    screen.drawLine(4, 'cabos de energia')
    screen.update()
