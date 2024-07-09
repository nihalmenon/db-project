const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect(function(err: Error | null) {
    if (err) throw err;
    console.log("Hello World");
});

const query = (sql: any, binding: any) => new Promise((resolve, reject) => {
    connection.query(sql, binding, (err: Error, result: any) => {
        if (err) return reject(err);
        resolve(result);
    });
});

export { connection, query };