import os
import mysql.connector
from mysql.connector import errorcode
import getpass

tables = list(reversed(['country', 'location', 'trip', 'activity', 'user', 'member']))

stored_procs = [
    spfile[:-4] for spfile in
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
    for table in tables:
        with cnx.cursor() as cursor:
            cursor.execute("drop table {}".format(table))
    for sp in stored_procs:
        with cnx.cursor() as cursor:
            cursor.execute("drop procedure {}".format(sp))
except mysql.connector.Error as err:
    print(err)
finally:
    cnx.close()