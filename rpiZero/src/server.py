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
                exposure_value = int(self._extract_number_from_path())
                self.client.set_exposure(exposure_value)
                response = f"Exposição selecionada: {exposure_value}"
                self._send_page(response.encode('utf-8'))
            elif self.path == '/stream.mjpg':
                self._stream_video()
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

        def _stream_video(self):
            self.send_response(200)
            self.send_header('Age', 0)
            self.send_header('Cache-Control', 'no-cache, private')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Content-Type', 'multipart/x-mixed-replace; boundary=FRAME')
            self.end_headers()
            try:
                while True:
                    frame = self.client.get_encoded_img()
                    self.wfile.write(b'--FRAME\r\n')
                    self.send_header('Content-Type', 'image/jpeg')
                    self.send_header('Content-Length', len(frame))
                    self.end_headers()
                    self.wfile.write(frame)
                    self.wfile.write(b'\r\n')
            except Exception as e:
                logging.warning(f'Removed streaming client {self.client_address}: {str(e)}')

