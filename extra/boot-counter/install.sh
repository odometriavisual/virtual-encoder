#!/bin/bash

# Installs system files for boot counter

if [ $UID != 0 ]
then
        echo "Execute as root: sudo $0"
        echo "Exiting..."
        exit
fi

install -m 644 boot-counter.service /etc/systemd/system

systemctl daemon-reload
systemctl enable boot-counter.service
systemctl start boot-counter.service
