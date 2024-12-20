from PIL import Image

from PIL import Image
import os

def generate_subimages_fixed_step(input_image_path, output_folder, sub_width=640, sub_height=480, step=10, total_images=400):
    # Criar o diretório de saída, se não existir
    os.makedirs(output_folder, exist_ok=True)

    # Carregar a imagem original
    original_image = Image.open(input_image_path)
    img_width, img_height = original_image.size

    # Ponto inicial (canto superior esquerdo)
    x, y = 0, 0

    # Definir movimentos: direita, baixo, esquerda, cima
    movements = [
        (step, 0),   # Direita
        (0, step),   # Baixo
        (-step, 0),  # Esquerda
        (0, -step)   # Cima
    ]

    # Limites para cada lado do quadrado
    limits = [
        (img_width - sub_width, 0),                 # Top Right
        (img_width - sub_width, img_height - sub_height),  # Bottom Right
        (0, img_height - sub_height),              # Bottom Left
        (0, 0)                                     # Top Left
    ]

    # Gerar subimagens
    subimage_count = 1
    for movement, (limit_x, limit_y) in zip(movements, limits):
        for _ in range(total_images // 4):
            # Extrair a subimagem
            subimage = original_image.crop((x+500, y+500, x + sub_width+500, y + sub_height+500))
            subimage.save(f"{output_folder}/{subimage_count:03d}.jpg")
            subimage_count += 1

            # Atualizar posição
            x += movement[0]
            y += movement[1]

            # Garantir que não ultrapasse os limites do lado atual
            x = max(0, min(x, limit_x))
            y = max(0, min(y, limit_y))

    print(f"{subimage_count - 1} subimagens geradas em {output_folder}.")

# Exemplo de uso
generate_subimages_fixed_step("../data/generated/high_res.jpg", "../data/generated/images")
