import os
from PIL import Image, ImageEnhance, ImageFilter
import shutil

# Caminho da pasta com as imagens
input_dir = 'data/42_20241105T022421'

# Caminho da pasta de saída (processed_images)
output_dir = 'data/processed_images/'

# Cria a pasta de saída se ela não existir
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Lista todos os arquivos no diretório de entrada
for filename in os.listdir(input_dir):
    # Verifica se o arquivo é uma imagem (pode adicionar outros formatos como .png ou .jpeg se necessário)
    if filename.endswith('.jpg') or filename.endswith('.png'):
        # Caminho completo da imagem
        input_image_path = os.path.join(input_dir, filename)

        # Abrir a imagem
        imagem = Image.open(input_image_path)

        # Converter a imagem para preto e branco
        imagem_pb = imagem.convert('L')

        # Ajustar o brilho de forma mais moderada (1.2)
        enhancer = ImageEnhance.Brightness(imagem_pb)
        imagem_brilhante = enhancer.enhance(3)  # Ajuste mais moderado

        # Aplicar um filtro de redução de ruído (filtro gaussiano)
        imagem_suavizada = imagem_brilhante.filter(ImageFilter.GaussianBlur(radius=2))  # Filtro leve para suavizar

        # Ajustar o contraste (leve aumento para melhorar detalhes)
        enhancer_contraste = ImageEnhance.Contrast(imagem_suavizada)
        imagem_final = enhancer_contraste.enhance(3)  # Ajuste moderado no contraste

        # Caminho para salvar a imagem processada
        output_image_path = os.path.join(output_dir, filename)

        # Salvar a imagem processada na nova pasta
        imagem_final.save(output_image_path)

        print(f"Imagem {filename} processada e salva em {output_image_path}")

print("Processamento concluído!")
