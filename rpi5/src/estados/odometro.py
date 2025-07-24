import multiprocessing
import threading
import time

from visual_odometer import VisualOdometer

from ..estados import Estado
from ..encoder_gs import EncoderGS
from ..dsp import to_grayscale


class EstadoAquisicaoOdometro(Estado):
    def __init__(self, gs: EncoderGS, odometer: VisualOdometer, reason: str):
        self.gs = gs
        self.odometer = odometer
        self.reason = reason

        self.gs.set("estado", "Aquisicao")
        self.gs.add_message(f"Aquisição: {self.reason} estimativa tempo real")

        self.new_image_event = multiprocessing.Event()

        self.pulses_lock = threading.Lock()
        self.pending_pulses = [0, 0]

        self.is_running = True
        self.is_first_pulse = True

        def _preprocess_last_img():
            last_t = time.time()
            while self.is_running:
                self.odometer.feed_image(to_grayscale(self.gs.camera.get_img()))
                t1 = time.time()
                dt = (t1 - last_t) * 1000
                last_t = t1
                print(f"camera {dt=:.3f} ms")

                self.new_image_event.set()

        def _estimate_distance():
            self.new_image_event.clear()
            acc = [0.0, 0.0]

            while self.is_running:
                self.new_image_event.wait()
                self.new_image_event.clear()

                t0 = time.time()
                try:
                    new_pulses = self.odometer.get_displacement()
                except ValueError:
                    new_pulses = (0, 0)
                t1 = time.time()

                if self.is_running:
                    # Checking again to avoid setting status after is_running was set to False
                    self.gs.set(
                        "estado", f"Aquisicao Deslocamento: {acc[0]:.2f}, {acc[1]:.2f}"
                    )
                    self.gs.set("pos", {"x": acc[0], "y": acc[1]})
                    dt = (t1 - t0) * 1000
                    print(
                        f"deslocamento {dt=:.3f}, acumulado {acc[0]: 6.02f} {acc[1]: 6.02f}"
                    )

                with self.pulses_lock:
                    self.pending_pulses[0] += new_pulses[0]
                    self.pending_pulses[1] += new_pulses[1]

                acc[0] += new_pulses[0]
                acc[1] += new_pulses[1]
                # TODO: log pulses

        self.preprocess_thread = threading.Thread(
            target=_preprocess_last_img, daemon=True
        ).start()
        self.estimate_thread = threading.Thread(
            target=_estimate_distance, daemon=True
        ).start()

    def stop(self):
        self.is_running = False
        self.gs.pi_zero_api.stop_acquisition()

    def run(self):
        if self.is_first_pulse:
            self.is_first_pulse = False

            timestamp_ns = time.time_ns()

            def start_acquisition_helper():
                self.gs.pi_zero_api.start_acquisition(timestamp_ns, self.reason, 0)

            req_thread = threading.Thread(target=start_acquisition_helper, daemon=True)

            for encoder in self.gs.encoders:
                encoder.send_pulse()

            req_thread.start()
        else:
            with self.pulses_lock:
                if self.pending_pulses[0] > 1:
                    self.gs.encoders[0].send_pulse("+")
                    self.pending_pulses[0] -= 1

                if self.pending_pulses[1] > 1:
                    self.gs.encoders[1].send_pulse("+")
                    self.pending_pulses[1] -= 1

                if self.pending_pulses[0] < 1:
                    self.gs.encoders[0].send_pulse("-")
                    self.pending_pulses[0] += 1

                if self.pending_pulses[1] < 1:
                    self.gs.encoders[1].send_pulse("-")
                    self.pending_pulses[1] += 1

        time.sleep(0.001)
