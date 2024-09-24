#!/bin/bash

# Installs system files for picam's garbage collector

if [ $UID != 0 ]
then
        echo "Execute as root: sudo $0"
        echo "Exiting..."
        exit
fi

install -m 644 picam_gc.service /etc/systemd/system
install -m 644 picam_gc.timer /etc/systemd/system

systemctl daemon-reload

systemctl enable picam_gc.timer
systemctl start picam_gc.timer