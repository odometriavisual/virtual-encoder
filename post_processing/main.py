from tools.plot_2d import plot2DFromData
from processing.displacement_processor import select_and_process_folder
from visual_odometer.visual_odometer import DEFAULT_CONFIG
import json

DEFAULT_CONFIG["Displacement Estimation"]["method"] = "phase-correlation"
#DEFAULT_CONFIG["Displacement Estimation"]["method"] = "svd"
DEFAULT_CONFIG["Displacement Estimation"]["skip_frames"] = False
DEFAULT_CONFIG["Displacement Estimation"]["reprocess_displacement"] = True
DEFAULT_CONFIG["Displacement Estimation"]["params"]["skip_frames_threshold"] = 10
DEFAULT_CONFIG["Displacement Estimation"]["params"]["reprocess_displacement_count"] = 10

#DEFAULT_CONFIG["Spatial Window"]["method"] = None

def get_config_label(config: dict) -> str:
    disp_config = config["Displacement Estimation"]
    method = disp_config["method"]
    reprocess = "reprocess" if disp_config["reprocess_displacement"] else "noreprocess"
    skip = "skip" if disp_config["skip_frames"] else "noskip"
    threshold = disp_config["params"].get("skip_frames_threshold", "na")
    return f"{method}_{reprocess}_{skip}_{threshold}"

def main():
    print(json.dumps(DEFAULT_CONFIG, indent=4))
    # Processa os deslocamentos e dados do IMU
    data = select_and_process_folder(config=DEFAULT_CONFIG, force_reprocessing=True)
    label = get_config_label(DEFAULT_CONFIG)
    filename = f'{data["image_folder"]}/{label}.png'
    print(filename)
    plot2DFromData(data["displacements"], filename)
    if data is None:
        print("Processamento abortado.")
        return

    # Após o processamento, gera o vídeo com sobreposição da trajetória
    #create_video_with_trajectory_overlay()

if __name__ == "__main__":
    main()
