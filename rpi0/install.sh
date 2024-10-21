#!/bin/bash

# Installs system files for RPi5 virtual-encoder

if [ $UID != 0 ]
then
        echo "Execute as root: sudo $0"
        echo "Exiting..."
        exit
fi

install -m 644 virtual-encoder.service /etc/systemd/system

systemctl daemon-reload
systemctl enable virtual-encoder.service
systemctl start virtual-encoder.service
