# ✈️ Travel Project
***Group 34:*** *Daniel Larkin, Dhyan Patel, Kieran Hulsman, Nihal Menon*

<br>

## Sample Data
🧸 **Toy Datasets** &nbsp;
[`users.csv`](server/data/sample/users.csv) &nbsp;
[`countries.csv`](server/data/sample/countries.csv) &nbsp;
[`locations.csv`](server/data/sample/locations.csv) &nbsp;
[`trips.csv`](server/data/sample/trips.csv) &nbsp;
[`members.csv`](server/data/sample/members.csv) &nbsp;
[`activities.csv`](server/data/sample/activities.csv)

⚡**Testing** &nbsp;
[`test-sample.sql`](server/data/test_queries/sample/test-sample.sql) &nbsp;
[`test-sample.out`](server/data/test_queries/sample/) 

<br>

## Production Data

📖 **Kaggle Datasets:**
[*Location* dataset](https://www.kaggle.com/datasets/viswanathanc/world-cities-datasets),
[*Country* dataset](https://www.kaggle.com/datasets/emolodov/country-codes-alpha2-alpha3)

📶 **Data Transformation** &nbsp;
```
$ cd server/scripts
$ python3 clean_kaggle_data.py
```

🤖 **Data Generation** 
```
$ cd server/scripts
$ python3 generate_users.py
$ python3 generate_members.py
$ python3 generate_trips_and_activities.py
```

🥇 **Prod Datasets** &nbsp;
[`users.csv`](server/data/prod/users.csv) &nbsp;
[`countries.csv`](server/data/prod/countries.csv) &nbsp;
[`locations.csv`](server/data/prod/locations.csv) &nbsp;
[`trips.csv`](server/data/prod/trips.csv) &nbsp;
[`members.csv`](server/data/prod/members.csv) &nbsp;
[`activities.csv`](server/data/prod/activities.csv)

⚡**Testing** &nbsp;
[`test-production.sql`](server/data/test_queries/production/test-production.sql) &nbsp;
[`test-production.out`](server/data/test_queries/production/) 

<br>

## 📊 Steps to Load Data
1. **Download MySQL 8.0**: [MySQL download](https://dev.mysql.com/downloads/installer/), [MySQL workbench](https://dev.mysql.com/downloads/workbench/)
2. **Spin-up server**:
```
$ cd /server
$ npm i
$ npm start
```
3. **Spin-up & populate DB**:
  - [`spin-up-db.py`](server/scripts/spin-up-db.py)
    creates [tables](server/db/tables), [triggers](server/db/triggers), [stored-procedures](server/db/storedProcedures)
  - [`spin-down-db.py`](server/scripts/spin-down-db.py) drops tables and stored-procedures
  - [`populate.py`](server/scripts/populate.py) populates DB with *production* data (`DB_ENV=prod`) or *sample* data (`DB_ENV=dev`)

```
mysql > SET GLOBAL log_bin_trust_function_creators = 1;
```
```
$ cd /server/scripts
$ python3 -m venv env
$ source env/bin/activate
$ pip3 install -r requirements.txt
```
```
(env) python3 spin-up-db.py
(env) python3 populate.py
```
```
(env) python3 spin-down-db.py
```

<br>

## 🟢 Running Web Application
```
$ cd /server
$ npm i
$ npm start
```
```
$ cd /client
$ npm i
$ npm start
```

<br>

## 🚀 (SQL) Features Implemented

**Feature 1:** Getting other trips to the same location (during an overlapping time period).
- [`search_match_trips.sql`](server/db/storedProcedures/search_match_trips.sql) (sql query)
- [`trip.ts`](server/src/routers/trip.ts) (`GET /connect?tid` route)
- [`connect.tsx`](client/src/components/connect.tsx) (React component for connecting with groups)

**Feature 3:** Suggest new friends as potential additions to a trip, when creating a new trip.
- [`suggested_members.sql`](server/db/storedProcedures/suggested_members.sql) (sql query)
- [`trip.ts`](server/src/routers/trip.ts) (`POST /trip` route)
- [`addTrip.tsx`](client/src/components/addTrip.tsx) (React component for adding a trip)
 
**Feature 5:** View past trips of a potential connection trip (in connect page).
- [`group_shared_past_trips.sql`](server/db/storedProcedures/group_shared_past_trips.sql) (sql query)
- [`trip.ts`](server/src/routers/trip.ts) (`GET /connect?tid` route - logic also done in connect route)
- [`pastTripsModal.tsx`](client/src/components/pastTripsModal.tsx) (React Component - modal on connect page)

