import csv
import os
import mysql.connector
from mysql.connector import errorcode
from dotenv import load_dotenv 
import json

load_dotenv() 

config = {
    'user': os.getenv("DB_USER"),
    'password': os.getenv("DB_PASSWORD"),
    'host': os.getenv("DB_HOST"),
    'database': os.getenv("DB_NAME")
}

def write_to_csv(filename, header, query, data):
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(header)
        writer.writerow(query)
        writer.writerows(data)

PROD_DATA_DIR = "production"
SAMPLE_DATA_DIR = "sample"
db_env = PROD_DATA_DIR if os.getenv("DB_ENV") == "prod" else SAMPLE_DATA_DIR

dirpath = "../data/test_queries/"

queries_sql_path = f"{dirpath + db_env}/test-{db_env}.sql"
if os.path.exists(queries_sql_path): 
    os.remove(queries_sql_path)

queries_json_file = open(f"{dirpath}/queries.json", "r")
queries_sql_file = open(queries_sql_path, "a")

queries = json.loads(queries_json_file.read())

for sp, query in queries.items():
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    
    sql = query["sql"]
    params = query["params"]["prod" if os.getenv("DB_ENV") == "prod" else "sample"]

    try:
        cursor.execute(sql, params)
        output = cursor.fetchall()

        columns = [i[0] for i in cursor.description] + ['query']
        query_row = ['' for _ in range(len(columns)-1)] + [f"{sql % tuple(params)}"]
        
        queries_sql_file.write(f"{cursor.statement};\n")

        write_to_csv(f"{dirpath + db_env}/test-{db_env}-{sp}.out.csv", columns, query_row, output)
        print("success:", cursor.statement)
    except Exception as e:
        print("failure:", sql)
        print(e)
    finally: cnx.close()

queries_sql_file.close()
queries_json_file.close()
