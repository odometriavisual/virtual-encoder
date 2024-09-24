#!/usr/bin/env python

"""
Picam's garbage collector

If filesystem usage is > UPPER_THRESHOLD:
  Delete picam images until filesystem usage is <= LOWER_THRESHOLD
"""

UPPER_THRESHOLD = .6
LOWER_THRESHOLD = .5

import os
from shutil import disk_usage
from os import scandir, mkdir, remove
from os.path import isdir

imgs_directory = '/home/pi/picam_imgs'

def list_sorted_directory(directory):
    with os.scandir(directory) as entries:
        sorted_entries = sorted(entries, key=lambda e: e.stat().st_ctime)
        return [e.name for e in sorted_entries]

K = 2**10
M = 2**20
G = 2**30

if not isdir(imgs_directory):
    mkdir(imgs_directory)

(total, used, _) = disk_usage(imgs_directory)
percent = used / total

if percent > UPPER_THRESHOLD:
    files = list_sorted_directory(imgs_directory)

    while percent > LOWER_THRESHOLD and len(files) > 0:
        remove(f'{imgs_directory}/{files.pop(0)}')
        (total, used, _) = disk_usage(imgs_directory)
        percent = used / total
