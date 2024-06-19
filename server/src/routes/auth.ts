import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connection from '../connection';
import validateUser from '../middleware/validateUser';
import hashPassword from '../middleware/hashPassword';

const router = express.Router();

// User Registration Route
router.post('/register', validateUser, hashPassword, (req, res) => {
    const { first_name, last_name, dob, email, pwd } = req.body;

    // to prevent SQL injection 
    const query = `
        INSERT INTO User (first_name, last_name, dob, gender, email, phone, socials, pwd)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(query, [first_name, last_name, dob,  email, pwd], (err: Error, results: any[]) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while creating the account');
        }
        res.status(201).send('User registered successfully');
    });
});

// User Authentication Route
router.post('/login', (req, res) => {
    const { email, pwd } = req.body;

    const query = 'SELECT * FROM User WHERE email = ?';
    connection.query(query, [email], async (err: Error, results: any[]) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred');
        }

        if (results.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(pwd, user.pwd);

        if (!isMatch) {
            return res.status(401).send('Invalid email or password');
        }

        const token = jwt.sign({ uid: user.uid }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    });
});

export default router;