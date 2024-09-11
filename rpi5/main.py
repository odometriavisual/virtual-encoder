'''
    Estados:
        - Modo disparo
        - Modo Habilitado: calibração foco + exposição
        - Modo Ativado: stream MJPEG | preprocessing | odometer | pulser
'''

from pi_zero_client import PiZeroClient
import preprocessing.grayscale
import preprocessing.window
import preprocessing.fft
import visual_odometer

def main():
    client = PiZeroClient()
    vid = client.get_mjpeg_stream()

    frame_num = -10

    img_old = None
    img = None
    M = None
    N = None

    while True:
        ret, frame = vid.read()

        img = preprocessing.grayscale.cv2_to_nparray_grayscale(frame)
        img = preprocessing.window.apply_border_windowing_on_image(img)
        img = preprocessing.fft.image_preprocessing(img)

        M, N = img.shape

        if frame_num > 0:
            deltax, deltay = visual_odometer.optimized_svd_method(img, img_old, M, N)
            print(f"Frame:  {frame_num:>3.2f}, delta:[{deltax:>5.2f},{deltay:>5.2f}]")

        frame_num += 1
        img_old = img


if __name__ == '__main__':
    main()