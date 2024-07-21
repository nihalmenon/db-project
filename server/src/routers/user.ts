import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {connection, query} from '../connection';
import validateUser from '../middleware/validateUser';
import hashPassword from '../middleware/hashPassword';
import auth from '../middleware/authMiddleware';

const router = express.Router();

// update user profile 
router.put('/user', auth, async (req, res) => {
    const { uid, first_name, last_name, dob, gender, email, phone, socials, pwd } = req.body;
    try {
        const sql = `CALL update_user(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await query(sql, [uid, first_name, last_name, dob, gender, email, phone, socials, pwd]);
        res.status(200).send('Profile updated successfully.');
    } catch {
        res.status(500).send('Something went wrong.');
    }
});

// User Registration Route
router.post('/register', validateUser, hashPassword, async (req, res) => {
    try {
        const { first_name, last_name, dob, gender, email, phone, socials, pwd } = req.body;

        let sql = `CALL search_user_email(?)`;
        let results = await query(sql, [email]) as any[];
        if (results[0].length > 0) return res.status(409).send('User already exists.');

        sql = `CALL add_user(?, ?, ?, ?, ?, ?, ?, ?)`;
        await query(sql, [first_name, last_name, dob, gender, email, phone, socials, pwd]);

        sql = `CALL search_user_email(?)`;
        results = await query(sql, [email]) as any[];

        let user = results[0][0];

        // send back auth header token
        const token = jwt.sign({ uid: user.uid }, process.env.JWT_SECRET ? process.env.JWT_SECRET : "", { expiresIn: '12h' });
        res.status(201).send({token});
    } catch (error : any) {
        res.status(500).send('Something went wrong.');
    }
});

// User Authentication Route
router.post('/login', (req, res) => {
    const { email, pwd } = req.body;

    const query = 'CALL search_user_email(?)';
    connection.query(query, [email], async (err: Error, results: any[]) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred.');
        }

        if (results[0].length === 0) {
            return res.status(401).send('Invalid email or password.');
        }
        
        const user = results[0][0];
        if (!user.pwd) return res.status(401).send("Invalid email or password.");

        const isMatch = await bcrypt.compare(pwd, user.pwd);

        if (!isMatch) {
            return res.status(401).send('Invalid email or password.');
        }

        const token = jwt.sign({ uid: user.uid }, process.env.JWT_SECRET ? process.env.JWT_SECRET : "", { expiresIn: '12h' });
        res.status(200).json({ token });
    });
});

// get friends of friends
router.get("/suggestedInvitees", auth, (req, res) => {
    const query = 'CALL suggested_members(?)';
    connection.query(query, [req.body.user.uid], (err: Error, results: any[]) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred.');
        }

        res.status(200).send(results[0]);
    });
});

router.get('/me', auth, (req, res) => {
    return res.status(200).send({"user": req.body.user, "token": req.body.token});
});

module.exports = router;