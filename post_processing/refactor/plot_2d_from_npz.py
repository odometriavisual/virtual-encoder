import numpy as np
import matplotlib.pyplot as plt

# Carregar os dados do arquivo .npz
txt_file = "last_npz_directory.txt"

try:
    with open(txt_file, "r") as f:
        numpy_folder = f.read().strip()  # Lê o caminho e remove espaços extras
except FileNotFoundError:
    print(f"Arquivo {txt_file} não encontrado. Certifique-se de que o arquivo já foi salvo anteriormente.")
    numpy_folder = None

# Carregar os dados do arquivo NPZ se o diretório for válido
if numpy_folder:
    loaded_data = np.load(numpy_folder, allow_pickle=True)
    print(f"Arquivo NPZ carregado de: {numpy_folder}")
else:
    print("Não foi possível carregar o arquivo NPZ devido a um erro no caminho.")

list_displacements = loaded_data['displacements']

# Converter para coordenadas acumuladas (trajetória)
trajectory = np.cumsum(list_displacements, axis=0)

# Plotar o gráfico 2D
plt.figure(figsize=(10, 6))
plt.plot(trajectory[:, 0], trajectory[:, 1], label='Trajetória')
plt.xlabel('Deslocamento X')
plt.ylabel('Deslocamento Y')
plt.title('Trajetória 2D')
plt.grid(True)
plt.legend()
plt.axis('equal')
plt.show()
