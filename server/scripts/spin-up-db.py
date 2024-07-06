import os
import mysql.connector
from mysql.connector import errorcode
from dotenv import load_dotenv 

load_dotenv() 

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

config = {
    'user': os.getenv("DB_USER"),
    'password': os.getenv("DB_PASSWORD"),
    'host': os.getenv("DB_HOST"),
    'database': os.getenv("DB_NAME")
}

cnx = mysql.connector.connect(**config)

try:
    for sql_file in (tables + triggers + stored_procs):
        try:
            with open(sql_file, 'r') as f:
                with cnx.cursor() as cursor:
                    cursor.execute(f.read(), multi=True)
                cnx.commit()
        except mysql.connector.Error as err:
            # print('{} {}'.format(os.path.basename(sql_file), err))
            pass
except mysql.connector.Error as err:
    print(err)
finally:
    cnx.close()