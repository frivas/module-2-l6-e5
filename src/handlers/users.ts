import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middleware/verifyToken';

const store = new UserStore();

type userDecoded = {
    user: User;
    iat: Number;
}

const index = async (_req: Request, res: Response) => {
    const users = await store.index();
    res.json(users);
};

const getUser = async (req: Request, res: Response) => {
    if (!req.params.userId) {
        res.status(400).json({ 'error': 'Please, specify a valid user id.' })
    }
    try {
        const userId = <number>(<unknown> req.params.userId);
        const user = await store.getUser(userId)
        res.json(user)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

const addUser = async (req: Request, res: Response) => {
    try {
        const user: User = {
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age: req.body.age,
            email: req.body.email,
            password_digest: req.body.password,
        }

        const newUser = await store.addUser(user)
        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET!);
        res.json(token)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

const updateUser = async (req: Request, res: Response) => {
    if (!req.params.userId) {
        res.status(400).json({ 'error': 'Please, specify a valid user id.' })
    }
    try {
        const user: User = {
            id: parseInt(req.params.userId),
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age: req.body.age,
            email: req.body.email,
            password_digest: req.body.password,
        }

        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!)
        const decodedUserId = ((decoded as unknown) as userDecoded).user.id
        if (decodedUserId !== parseInt(req.params.userId)) {
            throw new Error('User id does not match!')
        }

        const userId = parseInt(req.params.userId);
        const updatedUser = await store.updateUser(userId, user)
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ error: 'There has been an error while modifying the user.' })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    if (!req.params.userId) {
        res.status(400).json({ 'error': 'Please, specify a valid user id.' })
    }
    try {
        const userId = <number>(<unknown> req.params.userId);
        const deleted = await store.deleteUser(userId)
        res.json(deleted)
    } catch (err) {
        res.status(400)
        res.json(err)
    }

};

const getAllUsersOrders = async (req: Request, res: Response) => {
    try {
        const user = await store.getAllUsersOrder();
        res.json(user)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

const authenticate = async (req: Request, res: Response) => {
    try {
        const user = await store.authenticate(req.body.username, req.body.password);
        if (!user) {
            res.status(401).json({ error: 'Could not authenticate the user. Please, verify the username and password.' })
        }
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET!);
        res.json(token);
    } catch (err) {
        res.status(401).json({ error: 'Could not authenticate the user. Please, verify the username and password.' })
    }
};

const users_routes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/orders', verifyAuthToken, getAllUsersOrders);
    app.get('/users/:userId', getUser);
    app.put('/users/:userId', verifyAuthToken, updateUser);
    app.post('/users', verifyAuthToken, addUser);
    app.delete('/users/:userId', verifyAuthToken, deleteUser);
    app.post('/login', authenticate);
};

export default users_routes;