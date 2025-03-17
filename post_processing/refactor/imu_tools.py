import csv
import numpy as np

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

def cross(x, y):
    return np.array((x[1] * y[2] - x[2] * y[1], x[2] * y[0] - x[0] * y[2], x[0] * y[1] - x[1] * y[0]))

def fast_rot(q, v):
    print(v)
    t = 2 * cross(q[1:], v[1:])
    R = v[1:] + q[0] * t + cross(q[1:], t)
    return R

def quaternion_conjugate(q):
    w, x, y, z = q
    return np.array([w, -x, -y, -z])

def quaternion_multiply(q1, q2):
    w1, x1, y1, z1 = q1
    w2, x2, y2, z2 = q2
    return np.array([
        w1*w2 - x1*x2 - y1*y2 - z1*z2,
        w1*x2 + x1*w2 + y1*z2 - z1*y2,
        w1*y2 - x1*z2 + y1*w2 + z1*x2,
        w1*z2 + x1*y2 - y1*x2 + z1*w2
    ])

def rotate_vector(quaternion, vector):
    q_conjugate = quaternion_conjugate(quaternion)
    rotated_vector = quaternion_multiply(quaternion_multiply(quaternion, vector), q_conjugate)
    return rotated_vector[1:]  # Retorna o vetor rotacionado
