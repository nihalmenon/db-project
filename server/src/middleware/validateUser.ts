import { Request, Response, NextFunction } from 'express';

// might not need validateUser function 
const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, dob, email, pwd } = req.body;

    if (!first_name || !last_name || !dob || !email || !pwd) {
        return res.status(400).send('Missing required fields');
    }

    next();
};

export default validateUser;