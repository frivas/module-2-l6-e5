import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            res.status(401).json({ error: 'Not authorized. Please, provide a valid token.' })
        }
        const token = authorizationHeader!.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!)
        next()
    } catch (error) {
        res.status(401)
    }
}

export default verifyAuthToken;