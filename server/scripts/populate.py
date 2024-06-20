from time import sleep
import pandas as pd
import mysql.connector
from mysql.connector import errorcode
import numpy as np
import getpass
import requests
import random
import datetime


user = getpass.getpass("Enter your user: ")
pwd = getpass.getpass("Enter your password: ")

# Define your database connection configuration
config = {
    'user': user,
    'password': pwd,
    'host': '127.0.0.1',
    'database': 'snacksndaqs'  # Replace with your database name
}

# Paths to your CSV files
csv_files = {
    'users': './users.csv',
    'countries': './countries.csv',
    'locations': './locations.csv',
    'trips': './trips.csv',
    'members': './members.csv',
    'activities': './activities.csv'
}

# Define insert queries for each table
insert_users_query = """
INSERT INTO User (
    uid, first_name, last_name, dob, gender, email, phone, socials, pwd
) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
"""

insert_trips_query = """
INSERT INTO Trip (
    tid, lid, bio, start_date, end_date
) VALUES (%s, %s, %s, %s, %s)
"""

insert_members_query = """
INSERT INTO Member (
    uid, tid
) VALUES (%s, %s)
"""

insert_locations_query = """
INSERT INTO Location (
    lid, c_code, city
) VALUES (%s, %s, %s)
"""

insert_countries_query = """
INSERT INTO Country (
    c_code, c_name
) VALUES (%s, %s)
"""
insert_activities_query = """
INSERT INTO Activity (
    tid, a_no, a_description, dte
) VALUES (%s, %s, %s, %s)
"""

registerUrl = "http://localhost:3001/register"

try:
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()

    # Insert data into each table from corresponding CSV file
    for table, csv_file_path in csv_files.items():
        df = pd.read_csv(csv_file_path)


        for index, row in df.iterrows():
            if table == 'users':
                data = {
                    "first_name": row['first_name'],
                    "last_name": row['last_name'],
                    "dob": row['dob'],
                    "gender": row['gender'],
                    "email": row['email'],
                    "phone": row['phone'],
                    "socials": row['socials'],
                    "pwd": row['pwd']
                }

                response = requests.post(registerUrl, json=data)

                # RAW SQL INSERTION
                # cursor.execute(insert_users_query, (
                #     row['uid'], row['first_name'], row['last_name'], row['dob'], row['gender'],
                #     row['email'], row['phone'], row['socials'], row['pwd']
                # ))
            elif table == 'trips':
                cursor.execute(insert_trips_query, (
                    int(row['tid']), int(row['lid']), row['bio'], row["start_date"], row["end_date"]
                ))
            elif table == 'members':
                cursor.execute(insert_members_query, (
                    int(row['uid']), int(row['tid']) 
                ))
            elif table == 'locations':
                cursor.execute(insert_locations_query, (
                    int(row['lid']), row['c_code'], row['city']  
                ))
            elif table == 'countries':
                cursor.execute(insert_countries_query, (
                    row['c_code'], row['c_name']
                ))
            elif table == 'activities':
                cursor.execute(insert_activities_query, (
                    row['tid'], row['a_no'], row['a_description'], row['dte']
                ))
        print(f"Data inserted into {table} successfully")

    cnx.commit()

except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Wrong User or Pass")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)
finally:
    # End Connection
    if 'cursor' in locals() and cursor:
        cursor.close()
    if 'cnx' in locals() and cnx:
        cnx.close()