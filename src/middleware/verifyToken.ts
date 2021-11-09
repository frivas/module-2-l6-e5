import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            res.status(401).json({
                error: 'Not authorized. Please, provide a valid token.'
            });
        }
        if (authorizationHeader && process.env.TOKEN_SECRET) {
            try {
                const token = authorizationHeader.split(' ')[1];
                jwt.verify(token, process.env.TOKEN_SECRET);
                next();
            } catch (err) {
                console.log(`Error => ${JSON.stringify(err, null, 2)}`);
                res.status(401).json({
                    error: 'Not authorized. Please, provide a valid token.'
                });
            }
        } else {
            console.log(
                'Please, specify a valid AuthorizationHeader and a TOKEN_SECRET'
            );
        }
    } catch (error) {
        res.status(401);
    }
};

export default verifyAuthToken;
