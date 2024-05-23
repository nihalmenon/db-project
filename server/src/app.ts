import express, { Request, Response } from 'express'

const app = express()

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Hello World!")
})

app.use(express.json())

module.exports = app