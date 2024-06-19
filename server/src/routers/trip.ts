import express from 'express';
import connection from '../connection';
import auth from '../middleware/authMiddleware';


const router = express.Router();

router.post('/trip', auth, (req, res) => {
    const { uid, lid, bio } = req.body;
    const query = 'CALL create_trip (?, ?, ?)';
    connection.query(query, [uid, lid, bio], (err: Error, results: any[]) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while creating trip');
        }
        res.status(200).json(results);
    });
});

module.exports = router;