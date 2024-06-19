import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';

const hashPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.pwd = await bcrypt.hash(req.body.pwd, salt);
        next();
    } catch (error) {
        res.status(500).send('Error hashing password');
    }
};

export default hashPassword;