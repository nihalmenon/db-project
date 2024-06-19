import express from 'express';
import connection from '../connection';
import auth from '../middleware/authMiddleware';


const router = express.Router();

// get all trips protected route
router.get('/', auth, (req, res) => {
    const query = 'SELECT * FROM Trip';
    connection.query(query, (err: Error, results: any[]) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while fetching trips');
        }
        res.status(200).json(results);
    });
});

router.post('/trip', (req, res) => {
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