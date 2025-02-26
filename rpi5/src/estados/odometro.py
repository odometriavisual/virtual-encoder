from visual_odometer import VisualOdometer
import time
import threading
import numpy as np
from PIL import Image, ImageOps

from ..ihm.ihm import IHM
from ..pi_zero_client import PiZeroClient
from ..pulse_generator import PulseGenerator
from ..logger import Logger

from ..estados import Estado

def to_grayscale(img):
    return np.asarray(ImageOps.grayscale(Image.fromarray(img)))

class EstadoAquisicaoOdometro(Estado):
    def __init__(self, client: PiZeroClient, ihm: IHM, status: dict, encoders: tuple[PulseGenerator, ...], odometer: VisualOdometer, logger: Logger, reason: str):
        self.client = client
        self.ihm = ihm
        self.status = status
        self.encoders = encoders
        self.odometer = odometer
        self.logger = logger

        timestamp_ns = time.time_ns()
        self.client.start_acquisition(timestamp_ns, reason)
        self.logger.start(timestamp_ns)

        self.status['estado'] = 'Aquisicao'

        img = to_grayscale(self.client.get_img())
        self.odometer.feed_image(img)
        self.odometer.feed_image(img)

        self.new_image_event = threading.Event()

        self.pulses_lock = threading.Lock()
        self.pending_pulses = [0, 0]

        self.is_running = True

        def _preprocess_last_img():
            while self.is_running:
                self.client.vid_event.wait()
                self.client.vid_event.clear()

                self.odometer.feed_image(to_grayscale(self.client.get_img()))

                self.new_image_event.set()

        self.preprocess_thread = threading.Thread(target=_preprocess_last_img, daemon=True).start()

        def _estimate_distance():
            self.new_image_event.clear()
            acc = [0., 0.]

            while self.is_running:
                self.new_image_event.wait()
                self.new_image_event.clear()

                t0 = time.time()
                try:
                    new_pulses = self.odometer.get_displacement()
                except ValueError:
                    new_pulses = (0, 0)

                if self.is_running:
                    # Checking again to avoid setting status after is_running was set to False
                    self.status['estado'] = f'Aquisicao Deslocamento: {acc[0]:.2f}, {acc[1]:.2f}'
                    self.status['pos']['x'] = acc[0]
                    self.status['pos']['y'] = acc[1]
                    print(f'fps {1/(time.time()-t0):06.02f}, acumulado {acc[0]: 6.02f} {acc[1]: 6.02f}')

                with self.pulses_lock:
                    self.pending_pulses[0] += new_pulses[0]
                    self.pending_pulses[1] += new_pulses[1]

                acc[0] += new_pulses[0]
                acc[1] += new_pulses[1]
                self.logger.log(new_pulses)

        self.estimate_thread = threading.Thread(target=_estimate_distance, daemon=True).start()

    def stop(self):
        self.is_running = False
        self.logger.reset()
        self.client.stop_acquisition()

    def run(self):
        with self.pulses_lock:
            if self.pending_pulses[0] > 1:
                self.encoders[0].send_pulses(1)
                self.pending_pulses[0] -= 1

            if self.pending_pulses[1] > 1:
                self.encoders[1].send_pulses(1)
                self.pending_pulses[1] -= 1

        time.sleep(0.001)

