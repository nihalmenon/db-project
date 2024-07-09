import express from 'express';
import {connection, query} from '../connection';
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


router.get('/connect/:tid', auth, async (req, res) => {

    if (!req.params.tid) return res.status(400).send('A trip id is required.');

    try {
        let trips = [];
        let sql = 'CALL search_match_trips (?)';
        const userResults = await query(sql, [req.params.tid]) as any[];
        let users = userResults[0];

        // group users by tid
        let prevTid = -1;
        for (let i = 0; i < users.length; i++) {
            if (prevTid !== users[i].tid) {
                trips.push({"users": [] as any, "pastTrips": [] as any, "tid": users[i].tid, "lid": users[i].lid, "city": users[i].city, "c_name": users[i].c_name, "itinerary": [] as any, "bio": users[i].bio, "start_date": users[i].start_date, "end_date": users[i].end_date});
            }
            trips[trips.length - 1]["users"].push({"uid": users[i].uid, "first_name": users[i].first_name, "last_name": users[i].last_name, "dob": users[i].dob, "socials": users[i].socials, "email": users[i].email, "phone": users[i].phone});
            prevTid = users[i].tid;
        }

        // get itinerary, past trips for each tid
        for(let i = 0; i < trips.length; i++) {
            const tid = trips[i].tid;

            // itinerary
            sql = 'CALL get_itinerary (?)';
            const itineraryResults = await query(sql, [tid]) as any[];

            let itinerary = itineraryResults[0];
            for(let j = 0; j < itinerary.length; j++) {
                trips[i]["itinerary"].push({"a_no": itinerary[j].a_no, "a_description": itinerary[j].a_description, "dte": itinerary[j].dte});
            }
            

            // past trips
            sql = 'CALL group_shared_past_trips (?)';

            const pastTripsResults = await query(sql, [tid]) as any[];
            let pastTrips = pastTripsResults[0];
            prevTid = -1;
            for(let j = 0; j < pastTrips.length; j++) {
                if (prevTid !== pastTrips[j].tid) {
                    trips[i]["pastTrips"].push({"tid": pastTrips[j].tid, "lid": pastTrips[j].lid, "city": pastTrips[j].city, "c_name": pastTrips[j].c_name, "bio": pastTrips[i].bio, "start_date": pastTrips[j].start_date, "end_date": pastTrips[j].end_date, "itinerary": [] as any});
                }
                if (pastTrips[j].a_no != null) {
                    trips[i]["pastTrips"][trips[i]["pastTrips"].length - 1]["itinerary"].push({"a_no": pastTrips[j].a_no, "a_description": pastTrips[j].a_description, "dte": pastTrips[j].dte});
                }
                prevTid = pastTrips[j].tid;
            }
        }
        
        return res.status(200).send(trips);
    } catch (err) {
        console.error(err);
        return res.status(500).send('An error occurred while fetching matches.');
    }
})

router.get('/itenerary', auth, (req, res) => {
    const query = 'CALL get_itinerary (?)';
    connection.query(query, [req.query.tid], (err: Error, results: any[]) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while fetching itinerary.');
        }
        res.status(200).send(results);
    }
    )
});


module.exports = router;