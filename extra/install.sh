#!/bin/bash

# Installs system files for RPi5 virtual-encoder

if [ $UID != 0 ]
then
        echo "Execute as root: sudo $0"
        echo "Exiting without any changes..."
        exit
fi

install -m 644 before-virtual-encoder.service /etc/systemd/system
install -m 644 before-shutdown.service /etc/systemd/system
install -m 644 virtual-encoder.service /etc/systemd/system

systemctl daemon-reload

systemctl enable before-virtual-encoder.service
systemctl enable before-shutdown.service
systemctl enable virtual-encoder.service

for dir in {./chrony,./boot-counter,./picam_gc,./nginx}
do
        cd $dir
        ./install.sh
        cd -
done

./enable_watchdog.sh

echo "Services installed, reboot system to start services..."
