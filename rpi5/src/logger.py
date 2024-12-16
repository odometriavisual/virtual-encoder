from os import makedirs
from datetime import datetime
from os.path import isfile, isdir
from collections import deque

import threading, csv, time

class Logger:
    def __init__(self, modo):
         # Read the boot number:
        with open('/home/pi/boot-count.txt') as file:
            self.boot_num = file.read().strip()

        self.path = '/dev/null'
        self.save_dir = None
        self.active = False
        self.queue = deque()
        self.thread = threading.Thread(target=self._save_displacement, daemon=True)
        
    def _create_newdir(self, timestamp_ns):
        self.datenow = datetime.fromtimestamp(timestamp_ns // 1_000_000_000).strftime('%Y%m%dT%H%M%S')
        self.save_dir = f'/home/pi/picam_imgs/{self.boot_num}_{self.datenow}'
        if not isdir(self.save_dir):
            makedirs(self.save_dir)
    
    def start(self, timestamp_ns):
        self._create_newdir(timestamp_ns)
        self.active = True

        # Check if there is a log file, create otherwise 
        self.path = f'{self.save_dir}/displacement.csv'
        if not isfile(self.path):
            with open(self.path, mode='w', newline='') as file:
                writer = csv.writer(file)
                writer.writerow(["timestamp", "x", "y"])


        self.thread.start()

    def reset(self):
        self.active = False

    def log(self, displacement):
        self.queue.append(displacement)

    def _save_displacement(self):
        while True:
            time.sleep(0.01)
          
            # Check if queue is not empty:
            if len(self.queue) != 0:
                current_displacement = self.queue.pop()
                time_now = time.time_ns()
                with open(self.path, mode='a', newline='') as file:
                    writer = csv.writer(file)
                    row = [time_now, current_displacement[0], current_displacement[1]]
                    writer.writerow(row)
            else:
                if not self.active:
                    self.path = '/dev/null'
                    self.save_dir= None
                    break


