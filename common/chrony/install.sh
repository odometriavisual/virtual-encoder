#!/bin/bash

# Installs system files for synchronizing RTC

if [ $UID != 0 ]
then
        echo "Execute as root: sudo $0"
        echo "Exiting..."
        exit
fi

mkdir -p /etc/sysconfig
install -m 644 chrony.conf /etc/chrony/chrony.conf
install -m 644 chronyd /etc/sysconfig/chronyd

systemctl enable chrony
systemctl restart chrony

# Debug Commands
# chronyc sources
# chronyc trackiing
# timedatectl
