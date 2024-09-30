from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.pdfgen import canvas
from PIL import Image

# Caminho da imagem
image_path = 'output/chessboard_pattern.png'

# Carregar a imagem para verificar suas dimensões
image = Image.open(image_path)

# Definir o tamanho da página (A4)
page_width, page_height = A4

# Definir a largura desejada da imagem em cm (10 cm)
desired_width_cm = 20
desired_width_px = desired_width_cm * cm

# Manter a proporção da altura com base na largura original
aspect_ratio = image.height / image.width
desired_height_px = desired_width_px * aspect_ratio

# Nome do arquivo PDF de saída
output_pdf = f'output/output_chessboard_{desired_width_cm}cm.pdf'

# Criar um canvas PDF
c = canvas.Canvas(output_pdf, pagesize=A4)

# Definir a posição da imagem na página (a partir da borda inferior esquerda)
# Centralizar a imagem horizontalmente e deixá-la no meio verticalmente
x = (page_width - desired_width_px) / 2
y = (page_height - desired_height_px) / 2

# Adicionar a imagem ao PDF redimensionada
c.drawImage(image_path, x, y, desired_width_px, desired_height_px)

# Finalizar o PDF
c.showPage()
c.save()

print(f"PDF gerado: {output_pdf}")
