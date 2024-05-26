import express, { Request, Response } from 'express';

const { dbConnection } = require('./connection');
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Hello World!");
});

app.get('/hello-world', (req: Request, res: Response) => {
    dbConnection.query("SELECT * FROM User", function(err: Error, result: any) {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred.");
            return;
        }
        console.log("Result: " + result);
        res.status(200).send(result);
    });
});

app.use(express.json());

module.exports = app;