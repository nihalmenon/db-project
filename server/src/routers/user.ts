import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connection from '../connection';
import validateUser from '../middleware/validateUser';
import hashPassword from '../middleware/hashPassword';

const router = express.Router();

// User Registration Route
router.post('/register', validateUser, hashPassword, (req, res) => {
    const { first_name, last_name, dob, gender, email, phone, socials, pwd } = req.body;
 
    const query = `CALL create_user(?, ?, ?, ?, ?, ?, ?, ?)`
    connection.query(query, [first_name, last_name, dob, gender, email, phone, socials, pwd], (err: Error, results: any) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while creating the account.');
        }

        // send back auth header token
        const token = jwt.sign({ uid: results.insertId }, process.env.JWT_SECRET ? process.env.JWT_SECRET : "", { expiresIn: '12h' });
        
        res.status(201).json({ token });
    });
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

        if (results.length === 0) {
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

module.exports = router;