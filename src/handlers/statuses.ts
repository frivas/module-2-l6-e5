import express, { Request, Response } from 'express';
import { Status, StatusStore } from '../models/status';
import verifyAuthToken from '../middleware/verifyToken';

const store = new StatusStore();

const index = async (_req: Request, res: Response) => {
    const statuses = await store.index();
    res.json(statuses);
};

const getStatus = async (req: Request, res: Response) => {
    if (!req.params.statusId) {
        res.status(400).json({ error: 'Please, specify a valid status id.' });
    }
    try {
        const statusId = <number>(<unknown>req.params.statusId);
        const status = await store.getStatus(statusId);
        res.json(status);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const addStatus = async (req: Request, res: Response) => {
    try {
        const status: Status = {
            name: req.body.name
        };

        const newStatus = await store.addStatus(status);
        res.json(newStatus);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const updateStatus = async (req: Request, res: Response) => {
    if (!req.params.statusId) {
        res.status(400).json({ error: 'Please, specify a valid status id.' });
    }
    try {
        const status: Status = {
            id: parseInt(req.params.statusId),
            name: req.body.name
        };

        const statusId = <number>(<unknown>req.params.statusId);
        const updatedStatus = await store.updateStatus(statusId, status);
        res.json(updatedStatus);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const deleteStatus = async (req: Request, res: Response) => {
    if (!req.params.statusId) {
        res.status(400).json({ error: 'Please, specify a valid status id.' });
    }
    try {
        const statusId = <number>(<unknown>req.params.statusId);
        const updatedStatus = await store.deleteStatus(statusId);
        res.json(updatedStatus);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const status_routes = (app: express.Application) => {
    app.get('/statuses', index);
    app.get('/statuses/:statusId', getStatus);
    app.put('/statuses/:statusId', verifyAuthToken, updateStatus);
    app.post('/statuses', verifyAuthToken, addStatus);
    app.delete('/statuses/:statusId', verifyAuthToken, deleteStatus);
};

export default status_routes;
