import express from 'express';
import {connection, query} from '../connection';
import auth from '../middleware/authMiddleware';

const router = express.Router();

router.get('/locations', (req, res) => {
    const query = 'CALL get_locations';
    connection.query(query, (err: Error, results: any[]) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while fetching locations.');
        }
        res.status(200).send(results[0]);
    });
});


router.get('/searchLocations', async (req, res) => {
    const sql = 'CALL search_locations(?)';
    let results = await query(sql, [req.query.input]) as any[];
    res.status(200).send(results[0]);
    // connection.query(query, (err: Error, results: any[]) => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).send('An error occurred while fetching locations.');
    //     }
    //     res.status(200).send(results[0]);
    // });
});


module.exports = router;