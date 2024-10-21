# Rui Santos & Sara Santos - Random Nerd Tutorials
# Complete project details at https://RandomNerdTutorials.com/raspberry-pi-picamera2-python/
 
from picamera2 import Picamera2, Preview
from libcamera import controls
import time

picam2 = Picamera2()

#camera_config = picam2.create_preview_configuration()
#picam2.configure(camera_config)

#picam2.start_preview(Preview.QTGL)
picam2.start()
picam2.set_controls({"AfMode": controls.AfModeEnum.Manual, "LensPosition": 10.0}) #"LensPosition": number (number -- set the focus position to 1/number, number is any value you set, for example, if you set 2, it means that it will focus on the position of 0.5m.)
time.sleep(2)

picam2.capture_file("test_photo6.jpg")


from picamera2 import Picamera2