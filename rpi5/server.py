from flask import Flask, Response, request
import cv2
import time

class VideoStreamApp:
    def __init__(self, client, host='0.0.0.0', port=5000):
        self.app = Flask(__name__)
        self.client = client
        self.host = host
        self.port = port
        self.app.send_event = self.do_nothing
        self.setup_routes()

    def do_nothing(self, _):
        pass

    def generate_frames(self):
        while True:
            frame = self.client.get_img()
            buffer = cv2.imencode('.jpg', frame)
            buffer_bytes = buffer[1].tobytes()
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + buffer_bytes + b'\r\n')

    def setup_routes(self):
        @self.app.route('/video_feed')
        def video_feed():
            return Response(self.generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

        @self.app.route('/')
        def index():
            return """
            <html>
            <head>
                <style>
                    .video-frame {
                        width: 640px;
                        height: 480px;
                    }
                </style>
                <script>
                    async function setFocus() {
                        const focusValue = document.getElementById('focus_value').value;
                        if (focusValue) {
                            try {
                                const response = await fetch('/set_focus', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ focus_value: focusValue }),
                                });
                                const result = await response.text();
                                document.getElementById('status').innerText = result;
                            } catch (error) {
                                document.getElementById('status').innerText = 'Erro ao ajustar o foco.';
                            }
                        }
                    }
                </script>
            </head>
            <body>
                <h1>Streaming de Vídeo</h1>
                <img src='/video_feed' class='video-frame'/>
                <br>
                <label for="focus_value">Valor do Foco:</label>
                <input type="number" id="focus_value" name="focus_value" min="0" max="100" required>
                <button onclick="setFocus()">Definir Foco</button>
                <p id="status"></p>
            </body>
            </html>
            """

        @self.app.route('/set_focus', methods=['POST'])
        def set_focus():
            data = request.get_json()
            focus_value = data.get('focus_value')
            return "Nenhum valor de foco fornecido."

    def run(self):
        self.app.run(host=self.host, port=self.port)

