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

## 🛠️ Tech stack
- **Frontend**: `React.js`
- **Backend**: `Node.js` with `npm mysql`
- **Data managment**: `Python` with `mysql.connector`
- **DB**: `MySQL 8.0` using `MySQL workbench`

## 🎯 Milestone 1
- Have the signin and signup setup
- User authentication (Maximize user data privacy and security)
- Dashboard that displays all of user trips
- SQL queries for features 1 - 4 
- Application roadmap and web app design
- MySQL database setup with mock data
- Automated Python script to handle database population

## 📷 Screenshots

### Sign-up / sign-in with end-to-end user authentication
![signup-img](https://github.com/nihalmenon/db-project/assets/74116955/d8f35b60-e124-48c0-a76d-11f9890dbee9)
![signin-img](https://github.com/nihalmenon/db-project/assets/74116955/8a8a610b-f7e5-41d5-bfe8-3cfa58c94f9c)

### End-to-end integration (db-data displayed on frontend via api call to stored procedure)
![end-to-end-img](https://github.com/nihalmenon/db-project/assets/113640815/38b43f96-2f49-45e7-8793-98cc6bdf3f0c)

