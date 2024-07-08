import express from 'express';
import connection from '../connection';
import auth from '../middleware/authMiddleware';


const router = express.Router();

router.post('/trip', auth, (req, res) => {
    const { lid, bio, startDate, endDate, invitees } = req.body;
    const query = 'CALL create_trip (?, ?, ?, ?, ?)';

    connection.query(query, [req.body.user.uid, lid, bio, startDate, endDate], (err: Error, results: any[]) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while creating trip');
        }
        console.log(results);
        const tid = results[0][0].tid;

        for (let i = 0; i < invitees.length; i++) {
            const uidQuery = 'CALL search_user_email (?)';
            connection.query(uidQuery, [invitees[i]], (err: Error, results: any[]) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('An error occurred while searching for user');
                }
                const uid = results[0][0].uid;
                const query = 'CALL add_trip_member (?, ?)';
                connection.query(query, [tid, uid], (err: Error, results: any[]) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('An error occurred while adding members');
                    }
                });
            });
        }

        res.status(200).send(results);
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
        res.status(200).send(results[0]);
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
    connection.query(query, [req.query.tid], (err: Error, results: any[]) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while fetching matches.');
        }
        res.status(200).send(results);
    })
});

module.exports = router;