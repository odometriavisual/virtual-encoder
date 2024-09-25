# Rui Santos & Sara Santos - Random Nerd Tutorials
# Complete project details at https://RandomNerdTutorials.com/raspberry-pi-mjpeg-streaming-web-server-picamera2/

# Mostly copied from https://picamera.readthedocs.io/en/release-1.13/recipes2.html
# Run this script, then point a web browser at http:<this-ip-address>:7123
# Note: needs simplejpeg to be installed (pip3 install simplejpeg).

import logging
from http import server
from src.local_pizeroclient import Local_PiZeroClient
from threading import Condition
import socketserver

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

    def _send_page(self, content, content_type='text/html'):
        self.send_response(200)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', len(content))
        self.end_headers()
        self.wfile.write(content)

    def do_GET(self):
        if self.path == '/':
            self._redirect_to_index()
        elif self.path == '/index.html':
            self._send_page(PAGE.encode('utf-8'))
        elif self.path == '/imu.html':
            self._send_page(self.client.get_imu_data().encode('utf-8'))
        elif self.path.startswith('/focus.html'):
            focus_value = self._extract_number_from_path()
            response = self.client.set_focus(focus_value)
            self._send_page(response.encode('utf-8'))
        elif self.path.startswith('/exposure.html'):
            exposure_value = self._extract_number_from_path()
            response = self.client.set_exposure(exposure_value)
            self._send_page(response.encode('utf-8'))
        elif self.path == '/stream.mjpg':
            self._stream_video()
        else:
            self.send_error(404)
            self.end_headers()

    def _redirect_to_index(self):
        self.send_response(301)
        self.send_header('Location', '/index.html')
        self.end_headers()

    def _get_imu_data(self):
        if self.imu_controller:
            orientation = self.client.get_orientation()
            return f"Orientation: {orientation}"
        return "0,0,0,0"

    def _extract_number_from_path(self):
        try:
            return int(self.path.split('/')[-1])
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
                frame = self.client.get_image()
                if frame:
                    self.wfile.write(b'--FRAME\r\n')
                    self.send_header('Content-Type', 'image/jpeg')
                    self.send_header('Content-Length', len(frame))
                    self.end_headers()
                    self.wfile.write(frame)
                    self.wfile.write(b'\r\n')
        except Exception as e:
            logging.warning(f'Removed streaming client {self.client_address}: {str(e)}')

class StreamingServer(socketserver.ThreadingMixIn, server.HTTPServer):
    allow_reuse_address = True
    daemon_threads = True

def main():
    client = Local_PiZeroClient()

    address = ('', 7123)
    handler = lambda *args, **kwargs: MJPEGHandler(*args, client=client, **kwargs)
    server = StreamingServer(address, handler)

    print("Servidor iniciado em http://<raspberry_pi_ip>:7123")
    server.serve_forever()