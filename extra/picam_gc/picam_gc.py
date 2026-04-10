#!/usr/bin/env python

"""
Picam's garbage collector

If filesystem usage is > UPPER_THRESHOLD:
    While filesystem usage is > LOWER_THRESHOLD:
      Delete ensaios
"""

import os
import tomllib
import pathlib
from shutil import disk_usage, rmtree

UPPER_THRESHOLD = 0.8
LOWER_THRESHOLD = 0.5

config_path = os.getenv("HOME", default="/home/pi") + "/virtual_encoder.toml"

with open(config_path, "rb") as config_file:
    config = tomllib.load(config_file)
    imgs_directory = pathlib.Path(config["acquisition"]["directory"])


if not imgs_directory.is_dir():
    imgs_directory.mkdir(parents=True)


def get_percent():
    (total, used, _) = disk_usage(imgs_directory)
    return used / total


to_delete = sorted(imgs_directory.glob("trash/*")) + sorted([p for p in imgs_directory.iterdir()])

while get_percent() > LOWER_THRESHOLD and len(to_delete) > 0:
    p = to_delete.pop(0)
    print(f"Deletando: {p}")

    if p.is_file():
        p.unlink()
    else:
        rmtree(p)
else:
    print(f"Nenhum arquivo deletado, uso de disco: {get_percent() * 100:.2f}%")
