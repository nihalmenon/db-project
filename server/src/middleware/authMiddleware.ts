import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const connection = require('../connection');


const auth = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, uid: any) => {
		if (err) return res.sendStatus(403);

		// search for user in database
		const query = 'SELECT * FROM User WHERE uid = ?';
		connection.query(query, [uid], (err: Error, results: any[]) => {
			if (err) {
				console.error(err);
				return res.status(500).send('An error occurred while fetching user');
			}

			if (results.length === 0) {
				return res.status(403).send('User not found');
			}

			// if user is found, attach user to req object
			req.body.user = results[0];
			req.body.token = token;
			next();
		});
	});
}

export default auth;
