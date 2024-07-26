import express from 'express';
import {connection, query} from '../connection';
import auth from '../middleware/authMiddleware';
import formatDateForMySql from '../helpers/date';
import formatDateForMySQL from '../helpers/date';


const router = express.Router();

router.post('/trip', auth, async (req, res) => {
    const { lid, bio, startDate, endDate, invitees, itinerary } = req.body;
    let sql = 'CALL create_trip (?, ?, ?, ?, ?)';

    try {
        await query("START TRANSACTION", []);
        let results = await query(sql, [req.body.user.uid, lid, bio, startDate, endDate]) as any[];
        const tid = results[0][0].tid;

        for (let i = 0; i < invitees.length; i++) {
            const uidQuery = 'CALL search_user_email (?)';
            let results = await query(uidQuery, [invitees[i]]) as any[];
            if (results[0].length === 0) throw new Error('User not found');
            const uid = results[0][0].uid;
            sql = 'CALL add_trip_member (?, ?)';
            await query(sql, [uid, tid]);
        }

        for (let i = 0; i < req.body.itinerary.length; i++) {
            sql = 'CALL add_activity (?, ?, ?, ?)';
            await query(sql, [tid, i+1, req.body.itinerary[i].a_description, req.body.itinerary[i].dte]);
        }
        await query("COMMIT", []);
        return res.status(200).send('Trip created successfully');
    } catch (err) {
        await query("ROLLBACK", []);
        return res.status(500).send('An error occurred while creating trip: ' + err);
    }
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


router.get('/connect', auth, async (req, res) => {
    if (!req?.query?.tid) return res.status(400).send('A trip id is required.');

    try {
        let trips = [];
        let sql = 'CALL search_match_trips (?)';
        const userResults = await query(sql, [req.query.tid]) as any[];
        let users = userResults[0];

        // group users by tid
        let prevTid = -1;
        for (let i = 0; i < users.length; i++) {
            if (prevTid !== users[i].tid) {
                trips.push({"users": [] as any, "pastTrips": [] as any, "trip": {"tid": users[i].tid, "lid": users[i].lid, "city": users[i].city, "c_name": users[i].c_name, "itinerary": [] as any, "bio": users[i].bio, "start_date": users[i].start_date, "end_date": users[i].end_date}});
            }
            trips[trips.length - 1]["users"].push({"uid": users[i].uid, "first_name": users[i].first_name, "last_name": users[i].last_name, "dob": users[i].dob, "socials": users[i].socials, "email": users[i].email, "phone": users[i].phone});
            prevTid = users[i].tid;
        }

        // get itinerary, past trips for each tid
        for(let i = 0; i < trips.length; i++) {
            const tid = trips[i].trip.tid;

            // itinerary
            sql = 'CALL get_itinerary (?)';
            const itineraryResults = await query(sql, [tid]) as any[];

            let itinerary = itineraryResults[0];
            for(let j = 0; j < itinerary.length; j++) {
                trips[i].trip["itinerary"].push({"a_no": itinerary[j].a_no, "a_description": itinerary[j].a_description, "dte": itinerary[j].dte});
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

router.get('/itinerary', auth, (req, res) => {
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

router.get("/popularDestinations", auth, (req, res) => {

    const minAge = req?.query?.minAge ? req?.query?.minAge : null;
    const maxAge = req?.query?.maxAge ? req?.query?.maxAge : null;
    const gender = req?.query?.gender || null;
    const query = 'CALL popular_destinations (?, ?, ?)';

    connection.query(query, [minAge, maxAge ,gender], (err: Error, results: any[]) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while fetching popular destinations.');
        }
        res.status(200).send(results[0]);
    });
});

router.get("/averageDuration", auth, (req, res) => {

    const lid = req?.query?.lid;
    const query = 'CALL average_duration (?)';

    connection.query(query, [lid], (err: Error, results: any[]) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while fetching average duration.');
        }
        res.status(200).send(results);
    });
});

router.put('/updateTrip', auth, async (req, res) => {
    let { tid, start_date, end_date, bio, itinerary} = req?.body;
    if (!req || !tid || !start_date || !end_date || !bio || !itinerary) res.status(400).send('Invalid input to update Trip')
    
    try{
        await query("START TRANSACTION", []);
        let sql = 'CALL update_trip (?, ?, ?, ?)'; 
        await query(sql, [tid,start_date, end_date,bio]); 
        sql = 'CALL delete_trip_activities (?)';
        await query(sql, [tid]); 
        sql = 'CALL add_activity(?, ?, ?, ?)'
        for (let activity of itinerary){
            const {a_no, a_description, dte} = activity; 
            await query(sql, [tid, a_no, a_description, formatDateForMySQL(dte)]); 
        } 
        await query("COMMIT", []);
        return res.status(200).send('Trip updated successfully');
    } catch(err){
        console.error(err); 
        await query('ROLLBACK', []);
        return res.status(500).send('An error occured while fetching trip during updateTrip');
    }
});



router.get("/popularActivities", auth, (req, res) => {
        const lid = req.query.lid;
        const start_date = req.query.start_date == '' ? null : req.query.start_date;
        const end_date = req.query.end_date == '' ? null : req.query.end_date;

        const query = 'CALL popular_activities (?, ?, ?)';
    
        connection.query(query, [lid, start_date, end_date], (err: Error, results: any[]) => {
            if (err) {
                console.error(err);
                return res.status(500).send('An error occurred while fetching popular activities.');
            }
            res.status(200).send(results[0]);
        });
});


module.exports = router;