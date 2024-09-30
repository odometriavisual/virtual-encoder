# Rui Santos & Sara Santos - Random Nerd Tutorials
# Complete project details at https://RandomNerdTutorials.com/raspberry-pi-mjpeg-streaming-web-server-picamera2/

# Mostly copied from https://picamera.readthedocs.io/en/release-1.13/recipes2.html
# Run this script, then point a web browser at http:<this-ip-address>:7123
# Note: needs simplejpeg to be installed (pip3 install simplejpeg).

import logging
from http import server
from threading import Condition
import socketserver
import time
import io

from src.localPiZeroClient import LocalPiZeroClient
from src.localCalibration import startLocalCalibration
import numpy as np

import cv2

PAGE = '''\
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
class Server:
    def __init__(self, client:LocalPiZeroClient, port:int = 7123):
        self.client = client
        self.address = ('', port)
        startLocalCalibration(self.client)

    def run(self):
        handler = lambda *args, **kwargs: self.MJPEGHandler(*args, client=self.client, **kwargs)
        self.server = self.StreamingServer(self.address, handler)

        print("Servidor iniciado em http://raspberrypi00.local:7123")
        self.server.serve_forever()

    class StreamingServer(socketserver.ThreadingMixIn, server.HTTPServer):
        allow_reuse_address = True
        daemon_threads = True

    class StreamingOutput(io.BufferedIOBase):
        def __init__(self):
            self.frame = None
            self.condition = Condition()
        def write(self, buf):
            with self.condition:
                self.frame = buf
                self.condition.notify_all()

    class MJPEGHandler(server.BaseHTTPRequestHandler):
        def __init__(self, *args, client=None, **kwargs):
            self.client = client
            super().__init__(*args, **kwargs)

        def do_GET(self):
            if self.path == '/':
                self._redirect_to_index()
            elif self.path == '/index.html':
                self._send_page(PAGE.encode('utf-8'))
            elif self.path == '/imu.html':
                self._send_page(self._get_timestamp_and_imu_data().encode('utf-8'))
            elif self.path.startswith('/focus.html'):
                focus_value = float(self._extract_last_path())
                self.client.set_focus(focus_value)
                response = f"Foco selecionado: {focus_value}"
                self._send_page(response.encode('utf-8'))
            elif self.path.startswith('/exposure.html'):
                exposure_value = int(self._extract_last_path())
                self.client.set_exposure(exposure_value)
                response = f"Exposicao selecionada: {exposure_value}"
                self._send_page(response.encode('utf-8'))
            elif self.path == '/stream.mjpg':
                self._stream_video()
            elif self.path == '/dev/autofoco':
                response = "Iniciando autofoco"
                self._send_page(response.encode('utf-8'))
                startLocalCalibration(self.client)
            elif self.path == '/dev/detectChessCorners':
                img = cv2.bitwise_not(self.client.get_img())
                gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
                cv2.imwrite("test.png", gray)
                ret, corners = cv2.findChessboardCorners(gray, patternSize=(7, 7), corners=None)
                print(corners.shape)
                if ret:
                    response = f"{corners[0][0]},{corners[6][0]}"
                else:
                    response = "Not detected"
                self._send_page(response.encode('utf-8'))
            else:
                self.send_error(404)
                self.end_headers()

        def _send_page(self, content, content_type='text/html'):
            self.send_response(200)
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)

        def _redirect_to_index(self):
            self.send_response(301)
            self.send_header('Location', '/index.html')
            self.end_headers()

        def _get_timestamp_and_imu_data(self):
            orientation = self.client.get_orientation()
            return f"{time.time_ns()}_{time.monotonic_ns()}_{orientation}"

        def _extract_last_path(self):
            try:
                return self.path.split('/')[-1]
            except (ValueError, IndexError):
                return 0

        def _find_corners(self, img):
            img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            temp = cv2.GaussianBlur(img_gray, (0, 0), 105)
            img_gray = cv2.addWeighted(img_gray, 1.8, temp, -0.8, 0, img_gray)
            ret, corners = cv2.findChessboardCorners(img_gray, (6, 6), flags=cv2.CALIB_CB_ADAPTIVE_THRESH | cv2.CALIB_CB_NORMALIZE_IMAGE)
            return ret, corners

        def _stream_video(self):
            self.send_response(200)
            self.send_header('Age', 0)
            self.send_header('Cache-Control', 'no-cache, private')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Content-Type', 'multipart/x-mixed-replace; boundary=FRAME')
            self.end_headers()
            try:
                while True:
                    # Captura e processamento da imagem
                    img = self.client.get_img()

                    # Detecção de cantos do chessboard
                    ret, corners = self._find_corners(img)
                    if ret:
                        self.chessboard_detected = True
                        cv2.drawChessboardCorners(img, (6,6), corners, ret)
                        print(corners[0][0])
                        print(corners[36][0])
                    else:
                        self.chessboard_detected = False

                    _ret, buffer = cv2.imencode('.jpg', img)
                    frame =  buffer.tobytes()

                    print(self.chessboard_detected)

                    self.wfile.write(b'--FRAME\r\n')
                    self.send_header('Content-Type', 'image/jpeg')
                    self.send_header('Content-Length', len(frame))
                    self.end_headers()
                    self.wfile.write(frame)
                    self.wfile.write(b'\r\n')

            except Exception as e:
                logging.warning(f'Removed streaming client {self.client_address}: {str(e)}')