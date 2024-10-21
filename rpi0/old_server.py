# Rui Santos & Sara Santos - Random Nerd Tutorials
# Complete project details at https://RandomNerdTutorials.com/raspberry-pi-mjpeg-streaming-web-server-picamera2/

# Mostly copied from https://picamera.readthedocs.io/en/release-1.13/recipes2.html
# Run this script, then point a web browser at http:<this-ip-address>:7123
# Note: needs simplejpeg to be installed (pip3 install simplejpeg).

import io
import logging
import socketserver
from http import server
from threading import Condition

from libcamera import controls

from picamera2 import Picamera2
from picamera2.encoders import JpegEncoder
from picamera2.outputs import FileOutput

import time

import board
import adafruit_bno055

imu_data = "0,0,0,0"

PAGE = f'''\
<html>
<head>
<title>picamera3 MJPEG streaming demo</title>
</head>
<body>
<h1>Picamera3 MJPEG Streaming Demo</h1>
<img src="stream.mjpg" width="640" height="480" />
</body>
</html>
'''
t0 = time.time_ns()


class StreamingOutput(io.BufferedIOBase):
    def __init__(self):
        self.frame = None
        self.condition = Condition()

    def write(self, buf):
        with self.condition:
            self.frame = buf
            self.condition.notify_all()


class StreamingHandler(server.BaseHTTPRequestHandler):

    def do_GET(self):
        global t0  # Declara que t0 é uma variável global
        if self.path == '/':
            self.send_response(301)
            self.send_header('Location', '/index.html')
            self.end_headers()
        elif self.path == '/index.html':
            content = PAGE.encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)
        elif self.path == '/imu.html':
            if bno_enabled == True:
                quat = sensor.quaternion
            else:
                quat = (0, 0, 0, 0)
            t1 = time.time_ns()
            texto = f"{t0},{t1},{quat[0]},{quat[1]},{quat[2]},{quat[3]}"
            content = texto.encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)
        elif self.path.startswith('/focus.html'):
            try:
                # Extrair número da URL, assumindo que ele vem logo após 'focus.html/'
                number = int(self.path.split('/')[-1])
                # Você pode agora usar o número da maneira que quiser
                texto = f"LensPosition = {number}"
            except (ValueError, IndexError):
                # Se não houver número ou se não for um inteiro válido
                texto = "Por favor, envie um número inteiro positivo."
            number = float(number)
            picam2.set_controls({"AfMode": controls.AfModeEnum.Manual,
                                 "LensPosition": number})  # "LensPosition": number (number -- set the focus position to 1/number, number is any value you set, for example, if you set 2, it means that it will focus on the position of 0.5m.)
            t0 = str(time.time())
            content = texto.encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)
        elif self.path.startswith('/exposure.html'):
            try:
                # Extrair número da URL, assumindo que ele vem logo após 'exposure.html/'
                number = int(self.path.split('/')[-1])
                # Você pode agora usar o número da maneira que quiser
                texto = f"ExposureTime = {number}"
            except (ValueError, IndexError):
                # Se não houver número ou se não for um inteiro válido
                texto = "Por favor, envie um número inteiro positivo."
            # number = float(number)
            picam2.set_controls({"AfMode": controls.AfModeEnum.Manual,
                                 "LensPosition": number})  # "LensPosition": number (number -- set the focus position to 1/number, number is any value you set, for example, if you set 2, it means that it will focus on the position of 0.5m.)
            picam2.set_controls({"ExposureTime": number})
            t0 = str(time.time())
            content = texto.encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)
        elif self.path == '/stream.mjpg':
            self.send_response(200)
            self.send_header('Age', 0)
            self.send_header('Cache-Control', 'no-cache, private')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Content-Type', 'multipart/x-mixed-replace; boundary=FRAME')
            self.end_headers()
            try:
                while True:
                    with output.condition:
                        output.condition.wait()
                        frame = output.frame
                    self.wfile.write(b'--FRAME\r\n')
                    self.send_header('Content-Type', 'image/jpeg')
                    self.send_header('Content-Length', len(frame))
                    self.end_headers()
                    self.wfile.write(frame)
                    self.wfile.write(b'\r\n')
            except Exception as e:
                logging.warning(
                    'Removed streaming client %s: %s',
                    self.client_address, str(e))
        else:
            self.send_error(404)
            self.end_headers()


class StreamingServer(socketserver.ThreadingMixIn, server.HTTPServer):
    allow_reuse_address = True
    daemon_threads = True


i2c = board.I2C()
bno_enabled = False

try:
    sensor = adafruit_bno055.BNO055_I2C(i2c, 0x29)
    bno_enabled = True
except:
    print("Erro ao inciar o BNO055")
    bno_enabled = False

picam2 = Picamera2()
picam2.configure(picam2.create_video_configuration(main={"size": (640, 480)}))

# picam2.set_controls({"AfMode": controls.AfModeEnum.Manual, "LensPosition": 10.0}) #"LensPosition": number (number -- set the focus position to 1/number, number is any value you set, for example, if you set 2, it means that it will focus on the position of 0.5m.)
picam2.controls.FrameRate = 60  # Setting the frame rate
time.sleep(2)
output = StreamingOutput()
picam2.start_recording(JpegEncoder(), FileOutput(output))

try:
    address = ('', 7123)
    server = StreamingServer(address, StreamingHandler)
    server.serve_forever()
finally:
    picam2.stop_recording()