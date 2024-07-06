import random
import csv

MAX_UID = 10000
MAX_TID = 10000

MIN_TRIP_SIZE = 1
MAX_TRIP_SIZE = 10

def generate_member_data():
    data = []
    for tid in range(1, MAX_TID+1):
        uid_set = set()
        for _ in range(random.randint(MIN_TRIP_SIZE, MAX_TRIP_SIZE+1)):
            uid_set.add(random.randint(1, MAX_UID+1))
        data.extend([(uid, tid) for uid in uid_set])
    return data

def write_to_csv(filename, data):
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['uid', 'tid'])
        writer.writerows(data)

csv_filename = '../data/prod/members.csv'
write_to_csv(csv_filename, generate_member_data())
