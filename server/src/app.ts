import express, { Request, Response } from 'express';
const cors = require('cors');
const userRouter = require('./routers/user');
const tripRouter = require('./routers/trip');
const memberRouter = require('./routers/member');
const locationRouter = require('./routers/location');

import {connection} from './connection';
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Hello World!");
});

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET','POST','DELETE','UPDATE','PATCH','OPTIONS', 'PUT']
}));


app.get('/hello-world', (req: Request, res: Response) => {
    connection.default.query("SELECT * FROM User", function(err: Error, result: any) {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred.");
            return;
        }
        res.status(200).send(result);
    });
});

app.use(express.json());

app.use(userRouter);
app.use(tripRouter);
app.use(memberRouter);
app.use(locationRouter);

module.exports = app;