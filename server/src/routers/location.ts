import express from 'express';
import {connection} from '../connection';
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

module.exports = router;