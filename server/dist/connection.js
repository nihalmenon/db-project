"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql');
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
connection.connect(function (err) {
    if (err)
        throw err;
    console.log("Hello World");
});
exports.default = connection;
