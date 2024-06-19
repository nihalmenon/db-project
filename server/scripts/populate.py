import pandas as pd
import mysql.connector
from mysql.connector import errorcode
import numpy as np
import getpass


pwd = getpass.getpass("Enter your password: ")

# Define your database connection configuration
config = {
    'user': 'root',
    'password': pwd,
    'host': '127.0.0.1',
    'database': 'snackndaqs'  # Replace with your database name
}

# Paths to your CSV files
csv_files = {
    'users': './users.csv',
    'countries': './countries.csv',
    'locations': './locations.csv',
    'trips': './trips.csv',
    'members': './members.csv',
}

# Define insert queries for each table
insert_users_query = """
INSERT INTO User (
    uid, first_name, last_name, dob, gender, email, phone, socials, pwd
) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
"""

insert_trips_query = """
INSERT INTO Trip (
    tid, lid, bio
) VALUES (%s, %s, %s)
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

try:
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()

    # Insert data into each table from corresponding CSV file
    for table, csv_file_path in csv_files.items():
        df = pd.read_csv(csv_file_path)

        if table == 'users':
            df['uid'] = df.index + 1
            df['uid'] = df['uid'].apply(lambda x: f'{x:05d}')

        for index, row in df.iterrows():
            if table == 'users':
                cursor.execute(insert_users_query, (
                    row['uid'], row['first_name'], row['last_name'], row['dob'], row['gender'],
                    row['email'], row['phone'], row['socials'], row['pwd']
                ))
            elif table == 'trips':
                cursor.execute(insert_trips_query, (
                    int(row['tid']), int(row['lid']), row['bio'] 
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