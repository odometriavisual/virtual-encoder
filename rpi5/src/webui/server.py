import cv2
import time
from flask import Flask, Response, request

class WebuiApp:
    def __init__(self, send_event, get_img, host='0.0.0.0', port=5000):
        self.app = Flask(__name__)
        self.setup_routes()

        self.host = host
        self.port = port

        self.get_img = get_img
        self.send_event = send_event

        with open('./public/index.html', 'r') as file:
            self.html = file.read()

    def generate_frames(self):
        period = 5 * 1_000_000_000
        time_now = time.time_ns()
        next_time = time_now
        while True:
            time_now = time.time_ns()

            if time_now >= next_time:
                next_time += period
                frame = self.get_img()
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

        @self.app.route('/set_focus', methods=['POST'])
        def set_focus():
            data = request.get_json()
            self.send_event(('set_focus', data.get('focus_value')))
            return "Nenhum valor de foco fornecido."

    def run(self):
        self.app.run(host=self.host, port=self.port)

