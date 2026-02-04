#!/bin/bash

sudo apt install -y nginx
sudo ln -s /home/pi/virtual-encoder/extra/nginx/default /etc/nginx/sites-enabled/default
sudo chmod 755 /home/pi
