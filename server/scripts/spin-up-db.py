import os
import mysql.connector
from mysql.connector import errorcode
import getpass

tables = [
    '../db/tables/{}_ddl.sql'.format(table) for table in 
    ['country', 'location', 'trip', 'activity', 'user', 'member']
]

triggers = [
    '../db/triggers/{}'.format(trigger) for trigger in
    filter(lambda file : file.endswith(".sql"), os.listdir('../db/triggers'))
]

stored_procs = [
    '../db/storedProcedures/{}'.format(sp) for sp in
    filter(lambda file : file.endswith(".sql"), os.listdir('../db/storedProcedures'))
]

user = getpass.getpass("Enter your user: ")
pwd = getpass.getpass("Enter your password: ")

config = {
    'user': user,
    'password': pwd,
    'host': '127.0.0.1',
    'database': 'snacksndaqs'  # Replace with your database name
}

cnx = mysql.connector.connect(**config)

try:
    for sql_file in (tables + triggers + stored_procs):
        with open(sql_file, 'r') as f:
            with cnx.cursor() as cursor:
                cursor.execute(f.read(), multi=True)
            cnx.commit()
except mysql.connector.Error as err:
    print(err)
finally:
    cnx.close()