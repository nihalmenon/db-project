# ✈️ Travel Project
*Group 34: Daniel Larkin, Dhyan Patel, Kieran Hulsman, Nihal Menon*

## 📖 Kaggle Datasets
  - [*Trip* dataset](https://www.kaggle.com/datasets/rkiattisak/traveler-trip-data?resource=download)
  - [*Location* dataset](https://www.kaggle.com/datasets/viswanathanc/world-cities-datasets)
  - [*Country* dataset](https://www.kaggle.com/datasets/emolodov/country-codes-alpha2-alpha3)

## 📊 Steps to Load Data
1. **Download MySQL 8.0**: [MySQL download](https://dev.mysql.com/downloads/installer/), [MySQL workbench](https://dev.mysql.com/downloads/workbench/)
2. **Spin-up server**:
```
$ cd /server
$ npm i
$ npm start
```
3. **Spin-up & populate DB**:
  - [`spin-up-db.py`](https://github.com/nihalmenon/db-project/tree/main/server/scripts/spin-up-db.py) creates [tables](https://github.com/nihalmenon/db-project/tree/main/server/db/tables), [triggers](https://github.com/nihalmenon/db-project/tree/main/server/db/triggers), [stored-procedures](https://github.com/nihalmenon/db-project/tree/main/server/db/storedProcedures)
  - [`populate.py`](https://github.com/nihalmenon/db-project/blob/main/server/scripts/populate.py) populates DB with sample data
```
mysql > SET GLOBAL log_bin_trust_function_creators = 1;

$ cd /server/scripts
$ python3 -m venv env
$ source env/bin/activate
$ pip3 install -r requirements.txt

$ python3 spin-up-db.py
$ python3 populate.py
```
4. **Spin-down DB**
   - [`spin-down-db.py`](https://github.com/nihalmenon/db-project/tree/main/server/scripts/spin-down-db.py) drops tables and stored-procedures
```
$ python3 spin-down-db.py
```



