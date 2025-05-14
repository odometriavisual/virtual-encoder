#!/bin/bash

# Installs system files for RPi5 virtual-encoder

if [ $UID != 0 ]
then
        echo "Execute as root: sudo $0"
        echo "Exiting without any changes..."
        exit
fi

install -m 644 before-virtual-encoder.service /etc/systemd/system
install -m 644 virtual-encoder.service /etc/systemd/system

install -m 664 before_shutdown.py /usr/lib/systemd/system-shutdown

systemctl daemon-reload

systemctl enable before-virtual-encoder.service
systemctl enable virtual-encoder.service

echo "Services installed, reboot system to start services..."
