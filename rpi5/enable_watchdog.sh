#!/bin/bash

# Enables the watchdog timer

if [ $UID != 0 ]
then
  echo "Execute as root: sudo $0"
  echo "Exiting..."
  exit
fi

sed -i \
  -e 's/^#RuntimeWatchdogSec=.*/RuntimeWatchdogSec=15/' \
  -e 's/^#RebootWatchdogSec=.*/RebootWatchdogSec=5min/' \
  /etc/systemd/system.conf

sudo systemctl daemon-reload