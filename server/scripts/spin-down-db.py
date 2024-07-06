import os
import mysql.connector
from mysql.connector import errorcode
from dotenv import load_dotenv 

load_dotenv() 

tables = list(reversed(['country', 'location', 'trip', 'activity', 'user', 'member']))

stored_procs = [
    spfile[:-4] for spfile in
    filter(lambda file : file.endswith(".sql"), os.listdir('../db/storedProcedures'))
]


config = {
    'user': os.getenv("DB_USER"),
    'password': os.getenv("DB_PASSWORD"),
    'host': os.getenv("DB_HOST"),
    'database': os.getenv("DB_NAME")
}

cnx = mysql.connector.connect(**config)

try:
    for table in tables:
        try:
            with cnx.cursor() as cursor:
                cursor.execute("drop table {}".format(table))
        except mysql.connector.Error as err:
            # print('TABLE {} {}'.format(table, err))
            pass
    for sp in stored_procs:
        try:
            with cnx.cursor() as cursor:
                cursor.execute("drop procedure {}".format(sp))
        except mysql.connector.Error as err:
            # print('STORED PROC {} {}'.format(sp, err))
            pass 
except mysql.connector.Error as err:
    print(err)
finally:
    cnx.close()