import express from 'express';
import {connection} from '../connection';
import auth from '../middleware/authMiddleware';

const router = express.Router();

router.post('/member', (req, res) => {
    const { uid, tid } = req.body;
    const query = 'CALL add_trip_member (?, ?)';
    connection.query(query, [uid, tid], (err: Error, results: any[]) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while adding member to trip');
        }
        res.status(200).json(results);
    });
});

module.exports = router;
