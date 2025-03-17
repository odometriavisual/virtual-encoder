
skip_frames = False
skip_min_distance = 10
phase_windowing = "central"

IMAGE_CONFIGS = {
    "Displacement Estimation": {
        "method": "svd",
        "params": {}
    },
    "Frequency Window": {
        "method": "Stone et al 2007",
        "params": {}
    },
    "Spatial Window": {
        "method": "blackman_harris",
        "params": {
            "a0": 0.358,
            "a1": 0.47,
            "a2": 0.135,
            "a3": 0.037,
        }
    },
    "Downsampling": {
        "method": "",
        "params": {
            "factor": 1,
        }
    },
    "Image Enhancers": {
        "contrast": 1.5, #Defina None para desabilitar
        "brightness": 1.5,
        "normalize": True
    },
}

