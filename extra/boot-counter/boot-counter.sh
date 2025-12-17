#!/bin/bash

# Define paths:
PATH_DIR="/home/pi"
FILENAME="boot-count.txt"
FULL_PATH="$PATH_DIR/$FILENAME"

touch -a "$FULL_PATH"

count=$(cat "$FULL_PATH")
count=$((count + 1))
echo $count > "$FULL_PATH"

