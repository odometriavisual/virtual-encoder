import cv2
import time
from flask import Flask, Response, request
from werkzeug.serving import BaseWSGIServer

class WebuiApp:
    def __init__(self, ihm, host='0.0.0.0', port=5000):
        self.app = Flask(__name__)
        self.setup_routes()

        self.host = host
        self.port = port

        self.ihm = ihm

        with open('src/webui/public/index.html', 'r') as file:
            self.html = file.read()

    def generate_frames(self):
        period = 5 * 1_000_000_000
        time_now = time.time_ns()
        next_time = time_now
        while True:
            time_now = time.time_ns()

            if time_now >= next_time:
                next_time += period
                frame = self.ihm.get_img()
                buffer = cv2.imencode('.jpg', frame)
                buffer_bytes = buffer[1].tobytes()
                yield b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + buffer_bytes + b'\r\n'

            else:
                time.sleep(0.005)

    def setup_routes(self):
        @self.app.route('/video_feed')
        def video_feed():
            return Response(self.generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

        @self.app.route('/')
        def index():
            return self.html

        @self.app.route('/status', methods=['GET'])
        def status():
            res = self.ihm.status
            res['rpi5'] = True
            res['estado'] = self.ihm.estado
            res['modo'] = self.ihm.modo
            return res

        @self.app.route('/set_focus', methods=['POST'])
        def set_focus():
            data = request.get_json()
            self.ihm.send_event(('set_focus', data.get('focus_value')))
            return "Nenhum valor de foco fornecido."

        @self.app.route('/next_estado', methods=['POST'])
        def next_estado():
            self.ihm.send_event('next_estado')
            return 'ok'

        @self.app.route('/next_modo', methods=['POST'])
        def next_modo():
            self.ihm.send_event('next_estado')
            return 'ok'

        @self.app.route('/next_modo/<modo>', methods=['POST'])
        def next_modo_parameter(modo):
            self.ihm.send_event(('next_modo', modo))
            return 'ok'

    def run(self):
        BaseWSGIServer.protocol_version = "HTTP/1.1"
        self.app.run(host=self.host, port=self.port)

