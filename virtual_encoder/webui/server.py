import cv2
import time
import json

from flask import Flask, Response, abort
from werkzeug.serving import BaseWSGIServer

from virtual_encoder.encoder_gs import EncoderGS


class WebuiApp:
    def __init__(self, gs: EncoderGS, host="0.0.0.0", port=5000):
        self.gs = gs

        self.app = Flask(
            __name__, static_url_path="/assets", static_folder="dist/assets"
        )
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
                frame = self.gs.camera.peek_img()
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
            """
            The camera's MJPEG stream.
            """
            return Response(
                self.generate_frames(),
                mimetype="multipart/x-mixed-replace; boundary=frame",
            )

        @self.app.route("/")
        def index():
            """
            The web page.
            """
            with open("virtual_encoder/webui/dist/index.html", "r") as file:
                return file.read()

        @self.app.route("/status", methods=["GET"])
        def status():
            """
            Returns a json stream of the system's status.
            The stream contains a series of json objects, separated by \n, according to the following format:

            { "rpi5": { "temp": 0.0, "ip": "0.0.0.0", }, "rpi0": False|{"temp": 0.0}, "camera": False|True, "imu": False|[0., 0., 0., 0., 0.], "pos": {"x": 0, "y": 0}, "modo": "Iniciando", "estado": "", "msg": "" }
            """

            def generate_status():
                while True:
                    time.sleep(0.05)
                    yield "".join([json.dumps(self.gs.get_status()), "\n"])

            return Response(generate_status(), content_type="application/json")

        @self.app.route(
            "/start_acquisition/<int:pulses_per_second>/",
            methods=["POST"],
            defaults={"reason": ""},
        )
        @self.app.route(
            "/start_acquisition/<int:pulses_per_second>/<reason>", methods=["POST"]
        )
        def start_acquisition(pulses_per_second, reason):
            """
            If in the ModoOdometro or in the ModoTempo at the Ready state, starts an aquisition.
            pulses_per_second must be an integer, reason must be an UTF-8 encoded string.
            ModoOdometro ignores the parameter pulses_per_second.
            """
            self.gs.send_event(("start_acquisition", pulses_per_second, reason))
            return ""

        @self.app.route("/stop_acquisition", methods=["POST"])
        def stop_acquisition():
            """
            If in the ModoOdometro or in the ModoTempo at the Aquisição state, stops and saves an aquisition.
            """
            self.gs.send_event("stop_acquisition")
            return ""

        @self.app.route("/start_stream", methods=["POST"])
        def start_stream():
            """
            Starts the video stream.
            """
            self.gs.send_event("start_stream")
            return ""

        @self.app.route("/stop_stream", methods=["POST"])
        def stop_stream():
            """
            Stops the video stream.
            """
            self.gs.send_event("stop_stream")
            return ""

        @self.app.route("/set_exposure/<int:value>", methods=["POST"])
        def set_exposure(value):
            """
            Sets the camera exposure. Value must be an integer in microseconds.
            """
            self.gs.send_event(("set_exposure", value))
            return ""

        @self.app.route("/set_modo/<modo>", methods=["POST"])
        def set_modo(modo):
            """
            Sets the system's mode. The modo parameter must be a string of one of the following values:
            - "Autonomo"
            - "Tempo"
            - "Odometro"
            - "Download"

            Returns 404 if the modo string is invalid
            """
            if modo in ["Autonomo", "Tempo", "Odometro", "Download"]:
                self.gs.send_event(("set_modo", modo))
                return ""
            else:
                abort(404)

        @self.app.route("/shutdown/<component>", methods=["POST"])
        def shutdown(component):
            """
            Shutdowns a component of the system. The string component must be one of the following:
            - "all": shutdowns everything
            - "camera": only shutdowns the camera
            - "relay": forced shutdown of camera by opening the relay

            Returns 404 if the component string is invalid
            """
            if component in ["all", "camera", "relay"]:
                self.gs.send_event(("shutdown", component))
                return ""
            else:
                abort(404)

        @self.app.route("/reboot/<component>", methods=["POST"])
        def reboot(component):
            """
            Reboots a component of the system. The string component must be one of the following:
            - "all": reboots everything
            - "camera": only reboots the camera
            - "relay": forced reboot of camera by opening and closing the relay

            Returns 404 if the component string is invalid
            """
            if component in ["all", "camera", "relay"]:
                self.gs.send_event(("reboot", component))
                return ""
            else:
                abort(404)

    def run(self):
        BaseWSGIServer.protocol_version = "HTTP/1.1"
        self.app.run(host=self.host, port=self.port)
