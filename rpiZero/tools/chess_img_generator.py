import numpy as np
import cv2

# Definir o tamanho do tabuleiro de xadrez (quantidade de quadrados internos)
pattern_size = (8, 8)  # 7x7 quadrados internos (ajustar conforme necessário)
square_size = 50  # Tamanho de cada quadrado em pixels

# Gerar a imagem do tabuleiro de xadrez
img_size = (square_size * pattern_size[0], square_size * pattern_size[1])
chessboard_img = np.zeros((img_size[0], img_size[1]), dtype=np.uint8)

# Preencher a imagem com quadrados
for i in range(pattern_size[0]):
    for j in range(pattern_size[1]):
        if (i + j) % 2 == 0:
            cv2.rectangle(
                chessboard_img,
                (i * square_size, j * square_size),
                ((i + 1) * square_size, (j + 1) * square_size),
                255,
                -1
            )

# Salvar a imagem
cv2.imwrite('output/chessboard_pattern.png', chessboard_img)

# Exibir a imagem (opcional)
cv2.imshow('Chessboard', chessboard_img)
cv2.waitKey(0)
cv2.destroyAllWindows()