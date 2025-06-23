#plot_2d.py
import numpy as np
import matplotlib.pyplot as plt

def plot2DFromData(list_displacements, px_p_mm):
    plt.ion()

    # Converter para coordenadas acumuladas (trajetória)
    trajectory_px = np.cumsum(list_displacements, axis=0)

    # Converter de pixels para milímetros
    trajectory_mm = trajectory_px / px_p_mm

    # Plotar o gráfico 2D
    plt.figure(figsize=(10, 6))
    plt.plot(trajectory_mm[:, 0], trajectory_mm[:, 1], label='Trajetória')
    plt.xlabel('Deslocamento X (mm)')
    plt.ylabel('Deslocamento Y (mm)')
    plt.title('Trajetória 2D (em mm)')
    plt.grid(True)
    plt.legend()
    plt.axis('equal')
    plt.show()

    plt.ioff()
