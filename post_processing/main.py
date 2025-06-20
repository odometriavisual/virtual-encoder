from tools.video_overlay import create_video_with_trajectory_overlay
from tools.plot_2d import plot2DFromData
from processing.displacement_processor import select_and_process_folder


def main():
    # Processa os deslocamentos e dados do IMU
    data = select_and_process_folder(force_reprocessing=True)
    plot2DFromData(data["displacements"])

    if data is None:
        print("Processamento abortado.")
        return

    # Após o processamento, gera o vídeo com sobreposição da trajetória
    #create_video_with_trajectory_overlay()

if __name__ == "__main__":
    main()
