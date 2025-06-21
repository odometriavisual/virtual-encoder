
import numpy as np
import matplotlib.pyplot as plt

def plot2DFromData(list_displacements, fig_dir="plot2d.png"):
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
    #plt.show()
    plt.savefig(fig_dir)

