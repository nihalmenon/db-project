"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const dbConnection = require('./connection');
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.status(200).send("Hello World!");
});
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PATCH', 'OPTIONS']
}));
app.get('/hello-world', (req, res) => {
    dbConnection.default.query("SELECT * FROM Users", function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred.");
            return;
        }
        console.log("Result: " + JSON.stringify(result));
        res.status(200).send(result);
    });
});
app.use(express_1.default.json());
module.exports = app;
