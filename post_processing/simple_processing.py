from visual_odometer.visual_odometer import DEFAULT_CONFIG
from processing.displacement_processor import load_img_grayscale
from visual_odometer.visual_odometer import VisualOdometer

file_img_1 = "C:/Users/Demarky/Downloads/Nova pasta/1.png"
file_img_2 = "C:/Users/Demarky/Downloads/Nova pasta/2.png"

img_grascale_1 = load_img_grayscale(file_img_1, True, True)
img_grascale_2 = load_img_grayscale(file_img_2, True, True)

odometer = VisualOdometer(img_size=(320, 240))
odometer.feed_image(img_grascale_1)
print(odometer.get_displacement())
odometer.feed_image(img_grascale_2)
print(odometer.get_displacement())
