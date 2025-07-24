import cv2
import time
import json
from flask import Flask, Response
from werkzeug.serving import BaseWSGIServer

from ..encoder_gs import EncoderGS


class WebuiApp:
    def __init__(self, gs: EncoderGS, host="0.0.0.0", port=5000):
        self.gs = gs

        self.app = Flask(__name__)
        self.setup_routes()

        self.host = host
        self.port = port

    def generate_frames(self):
        period = 1_000_000_000 / 60
        time_now = time.time_ns()
        next_time = time_now
        while True:
            time_now = time.time_ns()

            if time_now >= next_time:
                next_time += period
                frame = self.gs.camera.get_img()
                buffer = cv2.imencode(".jpg", frame)
                buffer_bytes = buffer[1].tobytes()
                yield (
                    b"--frame\r\n"
                    b"Content-Type: image/jpeg\r\n\r\n" + buffer_bytes + b"\r\n"
                )

            else:
                time.sleep(0.005)

    def setup_routes(self):
        @self.app.route("/video_feed")
        def video_feed():
            return Response(
                self.generate_frames(),
                mimetype="multipart/x-mixed-replace; boundary=frame",
            )

        @self.app.route("/")
        def index():
            with open("src/webui/public/index.html", "r") as file:
                return file.read()

        @self.app.route("/<path:path>")
        def threejs(path):
            with open(f"src/webui/public/{path}", "r") as file:
                return file.read()

        @self.app.route("/status", methods=["GET"])
        def status():
            def generate_status():
                while True:
                    time.sleep(0.05)
                    yield "".join([json.dumps(self.gs.get_status()), "\n"])

            return Response(generate_status(), content_type="application/json")

        @self.app.route("/toggle_stream", methods=["POST"])
        def toggle_stream():
            self.gs.send_event("toggle_stream")
            return "Ok"

        @self.app.route("/set_focus/<focus>", methods=["POST"])
        def set_focus(focus):
            self.gs.send_event(("set_focus", focus))
            return "Ok"

        @self.app.route("/set_exposure/<exposure>", methods=["POST"])
        def set_exposure(exposure):
            self.gs.send_event(("set_exposure", exposure))
            return "Ok"

        @self.app.route("/next_estado", methods=["POST"])
        def next_estado():
            self.gs.send_event("next_estado")
            return "ok"

        @self.app.route("/next_estado/<estado>/<pps>/", methods=["POST"])
        def next_estado_parameter(estado, pps):
            self.gs.send_event(("next_estado", estado, pps, ""))
            return "ok"

        @self.app.route("/next_estado/<estado>/<pps>/<reason>", methods=["POST"])
        def next_estado_parameter2(estado, pps, reason):
            self.gs.send_event(("next_estado", estado, pps, reason))
            return "ok"

        @self.app.route("/next_modo", methods=["POST"])
        def next_modo():
            self.gs.send_event("next_estado")
            return "ok"

        @self.app.route("/next_modo/<modo>", methods=["POST"])
        def next_modo_parameter(modo):
            self.gs.send_event(("next_modo", modo))
            return "ok"

    def run(self):
        BaseWSGIServer.protocol_version = "HTTP/1.1"
        self.app.run(host=self.host, port=self.port)
