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

router.get('/connect/:tid', auth, async (req, res) => {

    if (!req.params.tid) return res.status(400).send('A trip id is required.');

    let trips = [];
    let query = 'CALL search_match_trips (?)';

    try {
        const obj = await connection.query(query, [req.params.tid]);
        console.log(obj);
        return res.status(200).send();
    } catch (err) {
        console.error(err);
        return res.status(500).send('An error occurred while fetching matches.');
    }


    // connection.query(query, [req.params.tid], (err: Error, results: any[]) => {
    //     console.log(results);
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).send('An error occurred while fetching matches.');
    //     }

    //     let users = results[0];
    //     let prevTid = -1;
    //     for (let i = 0; i < users.length; i++) {
    //         if (prevTid !== users[i].tid) {
    //             trips.push({"users": [] as any, "pastTrips": [] as any, "tid": users[i].tid, "lid": users[i].lid, "city": users[i].city, "c_name": users[i].c_name, "itinerary": [] as any, "bio": users[i].bio, "start_date": users[i].start_date, "end_date": users[i].end_date});
    //         }
    //         trips[trips.length - 1]["users"].push({"uid": users[i].uid, "first_name": users[i].first_name, "last_name": users[i].last_name, "dob": users[i].dob, "socials": users[i].socials, "email": users[i].email, "phone": users[i].phone});
    //         prevTid = users[i].tid;
    //     }

    //     // get past trips for each tid in trips
    //     for(let i = 0; i < trips.length; i++) {
    //         let tid = trips[i].tid;

    //         query = 'CALL get_itinerary (?)';
    //         connection.query(query, [tid], (err: Error, results: any[]) => {
    //             console.log(results);
    //             if (err) {
    //                 console.error(err);
    //                 return res.status(500).send('An error occurred while fetching itinerary.');
    //             }
    //             let itinerary = results[0];
    //             for(let j = 0; j < itinerary.length; j++) {
    //                 trips[i]["itinerary"].push({"a_no": itinerary[j].a_no, "a_description": itinerary[j].a_description, "dte": itinerary[j].dte});
    //             }

    //             query = 'CALL group_shared_past_trips (?)';
    //             connection.query(query, [tid], (err: Error, results: any[]) => {
    //                 console.log(results);
    //                 if (err) {
    //                     console.error(err);
    //                     return res.status(500).send('An error occurred while fetching shared trips.');
    //                 }
    //                 let pastTrips = results[0];
    //                 prevTid = -1;
                    
    //                 for(let j = 0; j < pastTrips.length; j++) {
    //                     if (prevTid !== pastTrips[j].tid) {
    //                         trips[i]["pastTrips"].push({"tid": pastTrips[j].tid, "lid": pastTrips[j].lid, "city": pastTrips[j].city, "c_name": pastTrips[j].c_name, "bio": pastTrips[i].bio, "start_date": pastTrips[j].start_date, "end_date": pastTrips[j].end_date, "itinerary": [] as any});
    //                     }
    //                     if (pastTrips[j].a_no != null) {
    //                         trips[i]["pastTrips"][trips[i]["pastTrips"].length - 1]["itinerary"].push({"a_no": pastTrips[j].a_no, "a_description": pastTrips[j].a_description, "dte": pastTrips[j].dte});
    //                     }
    //                     prevTid = pastTrips[j].tid;
    //                 }
    //                 return res.status(200).send(trips);
    //             });
    //         });
    //     }
    // });


    
    // get trips, users going to same location
    // iterate through each trip: get past trips given a tid 
    // iterate through each trip: get itinerary
})

module.exports = router;