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

// return all trips for a given user
router.get('/trips', auth, (req, res) => {
    const query = 'CALL get_user_trips (?)';
    connection.query(query, [req.body.user.uid], (err: Error, results: any[]) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while fetching trips.');
        }
        res.status(200).send(results);
    });
});

// return trip from tid
router.get('/trip', auth, (req, res) => {
    // given a trip id, return trip details
    const query = 'CALL get_trip (?)';
    connection.query(query, [req.body.tid], (err: Error, results: any[]) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while fetching trip.');
        }
        res.status(200).send(results);
    });
});

router.get('/match', auth, (req, res) => {
    // given a trip id, return all matching trips
    const query = 'CALL search_match_trips (?)';
    connection.query(query, [req.body.tid], (err: Error, results: any[]) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while fetching matches.');
        }
        res.status(200).send(results);
    })
});

module.exports = router;