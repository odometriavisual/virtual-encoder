#!/usr/bin/env python

"""
Picam's garbage collector

While filesystem usage is > UPPER_THRESHOLD:
  Delete directories until only one is remaining
While filesystem usage still is > UPPER_THRESHOLD:
  Delete files from the last directory
"""

UPPER_THRESHOLD = .8
LOWER_THRESHOLD = .7

import os
from shutil import disk_usage, rmtree
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
    directories = list_sorted_directory(imgs_directory)

    # first remove full directories
    while percent > LOWER_THRESHOLD and len(directories) > 1:
        rmtree(f'{imgs_directory}/{directories.pop(0)}')
        # print(f'would remove {imgs_directory}/{directories.pop(0)}')

        (total, used, _) = disk_usage(imgs_directory)
        percent = used / total

    # remove files from last directory
    if percent > LOWER_THRESHOLD:
        last_directory = f'{imgs_directory}/{directories[0]}'
        files = list_sorted_directory(last_directory)

        while percent > LOWER_THRESHOLD:
            remove(f'{last_directory}/{files.pop(0)}')
            # print(f'  would remove {last_directory}/{files.pop(0)}')

            (total, used, _) = disk_usage(imgs_directory)
            percent = used / total
