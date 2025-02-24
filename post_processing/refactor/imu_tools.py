import os
import csv

def load_imu_data(imu_file):
    imu_data = []
    with open(imu_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            imu_data.append({
                'timestamp': int(row['timestamp']),
                'qx': float(row['qx']) if row['qx'] else 0.0,
                'qy': float(row['qy']) if row['qy'] else 0.0,
                'qz': float(row['qz']) if row['qz'] else 0.0,
                'qw': float(row['qw']) if row['qw'] else 0.0
            })
    return imu_data

def find_closest_imu_data(imu_data, img_timestamp):
    return min(imu_data, key=lambda x: abs(x['timestamp'] - img_timestamp))
