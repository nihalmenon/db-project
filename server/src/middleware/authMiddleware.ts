import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {connection} from '../connection';


const auth = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) return res.status(401).send("No token provided.");

	jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
		if (err) return res.status(403).send("Invalid token.");

		// search for user in database
		const query = 'CALL search_user_uid(?)';
		connection.query(query, [decoded.uid], (err: Error, results: any[]) => {
			if (err) {
				console.error(err);
				return res.status(500).send('An error occurred while fetching user.');
			}

			if (results[0].length === 0) {
				return res.status(403).send('User not found.');
			}

			// if user is found, attach user to req object
			req.body.user = results[0][0];
			req.body.token = token;
			next();
		});
	});
}

export default auth;
