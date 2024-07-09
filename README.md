# ✈️ Travel Project
*Group 34: Daniel Larkin, Dhyan Patel, Kieran Hulsman, Nihal Menon*

## 📖 Kaggle Datasets
  - [*Location* dataset](https://www.kaggle.com/datasets/viswanathanc/world-cities-datasets)
  - [*Country* dataset](https://www.kaggle.com/datasets/emolodov/country-codes-alpha2-alpha3)
    
## 🤖 Data Generation
  - [*Users* datagen](https://github.com/nihalmenon/db-project/blob/main/server/scripts/generate_users.py)
  - [*Members* datagen](https://github.com/nihalmenon/db-project/blob/main/server/scripts/generate_members.py)
  - [*Trips* datagen](https://github.com/nihalmenon/db-project/blob/main/server/scripts/generate_trips_and_activities.py)

## 📊 Steps to Load Data
1. **Download MySQL 8.0**: [MySQL download](https://dev.mysql.com/downloads/installer/), [MySQL workbench](https://dev.mysql.com/downloads/workbench/)
2. **Spin-up server**:
```
$ cd /server
$ npm i
$ npm start
```

3. **Spin-up & populate DB**:
   
  - Production Data:
  
    In the "server" directory, create a ".env" file and add
    ```
    DEV_ENV=prod
    ```
  - Sample Data:

    Ensure DEV_ENV is not prod
  - [`spin-up-db.py`](https://github.com/nihalmenon/db-project/tree/main/server/scripts/spin-up-db.py) creates [tables](https://github.com/nihalmenon/db-project/tree/main/server/db/tables), [triggers](https://github.com/nihalmenon/db-project/tree/main/server/db/triggers), [stored-procedures](https://github.com/nihalmenon/db-project/tree/main/server/db/storedProcedures)
  - [`populate.py`](https://github.com/nihalmenon/db-project/blob/main/server/scripts/populate.py) populates DB with either Production or Sample Data 
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



