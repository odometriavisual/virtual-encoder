from visual_odometer.displacement_estimators.svd import svd_estimate_shift, phase_fringe_filter, normalize_product
import numpy as np
from numpy import ndarray
import cupy as cp  # Import cupy for GPU computation

def gpu_svd_method(fft_beg: ndarray, fft_end: ndarray, M: int, N: int, phase_windowing=None, finge_filter=True):
    # Converting inputs to cupy arrays for GPU processing
    fft_beg_gpu = cp.asarray(fft_beg)
    fft_end_gpu = cp.asarray(fft_end)

    # Normalizing and optionally filtering
    Q_gpu = normalize_product(fft_beg_gpu, fft_end_gpu)

    #Desativando temporariamente
    #if finge_filter is True:
    #    Q_gpu = phase_fringe_filter(Q_gpu)

    # Compute the SVD decomposition on GPU
    qu_gpu, s_gpu, qv_gpu = cp.linalg.svd(Q_gpu, full_matrices=False)

    # Convert results back to numpy for compatibility
    qu = cp.asnumpy(qu_gpu)
    qv = cp.asnumpy(qv_gpu)

    # Phase operator:
    ang_qu = np.angle(qu[:, 0])
    ang_qv = np.angle(qv[0, :])

    # Deslocamento no eixo x é equivalente a deslocamento ao longo do eixo das colunas e eixo y das linhas:
    deltay = svd_estimate_shift(ang_qu, M, phase_windowing)
    deltax = svd_estimate_shift(ang_qv, N, phase_windowing)

    # round() pois o retorno é em pixels
    return deltax, deltay
