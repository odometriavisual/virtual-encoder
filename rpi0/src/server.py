from .local_pi_zero_client import LocalPiZeroClient
from flask import Flask

def create_app(client: LocalPiZeroClient):
    # Set static_* parameters to serve the ensaios' zip files
    app = Flask(__name__, static_url_path='/ensaio', static_folder='/home/pi/picam_imgs')

    @app.route('/focus/<float:value>', methods=["POST"])
    def set_focus(value):
        client.set_focus(value)
        return f"Foco selecionado: {value}"

    @app.route('/exposure/<int:value>', methods=["POST"])
    def set_exposure(value):
        client.set_exposure(value)
        return f"Exposicao selecionada: {value}"

    @app.route('/status/<rpi5status>', methods=["GET"])
    def get_status(rpi5status):
        status = client.get_status()
        client.process_status(rpi5status)
        return status

    @app.route('/file_count', methods=["GET"])
    def get_file_count():
        return f"{client.get_file_count()}"

    @app.route('/start_acquisition/<int:timestamp>/<int:pulses_period_ns>/', defaults={'reason': ''}, methods=["POST"])
    @app.route('/start_acquisition/<int:timestamp>/<int:pulses_period_ns>/<reason>', methods=["POST"])
    def start_acquisition(timestamp, reason, pulses_period_ns):
        client.start_acquisition(timestamp, reason, pulses_period_ns)
        return ''

    @app.route('/stop_acquisition', methods=["POST"])
    def stop_acquisition():
        client.stop_acquititions()
        return ''

    @app.route('/poweroff', methods=["POST"])
    def poweroff():
        client.poweroff()
        return ''

    @app.route('/reboot', methods=["POST"])
    def reboot():
        client.reboot()
        return ''

    @app.route('/pause_stream', methods=["POST"])
    def pause_stream():
        client.pause_stream()
        return ''

    @app.route('/resume_stream', methods=["POST"])
    def resume_stream():
        client.resume_stream()
        return ''

    return app