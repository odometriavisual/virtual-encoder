from tools.plot_2d import plot2DFromData
from processing.displacement_processor import process_displacements
from config_interface import show_config_interface
from visual_odometer.visual_odometer import DEFAULT_CONFIG
from post_processing.utils.file_tools import select_folder, get_config_label


def main():
    folder = select_folder()
    print(folder)
    config = DEFAULT_CONFIG.copy()
    updated_config = show_config_interface(config, folder)
    data = process_displacements(folder, updated_config, force_reprocessing=True)

    label = get_config_label(updated_config)
    filename = f'{data["image_folder"]}/{label}.png'
    print(filename)
    plot2DFromData(data["displacements"], filename)

if __name__ == "__main__":
    main()
