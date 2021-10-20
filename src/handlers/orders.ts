import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import verifyAuthToken from '../middleware/verifyToken';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    const orders = await store.index();
    res.json(orders);
};

const getOrder = async (req: Request, res: Response) => {
    if (!req.params.orderId) {
        res.status(400).json({ 'error': 'Please, specify a valid order id.' })
    }
    try {
        const orderId = <number>(<unknown> req.params.orderId);
        const order = await store.getOrder(orderId)
        res.json(order)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

const addOrder = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            status: req.body.status,
            user_id: parseInt(req.body.user_id)
        }

        const newOrder = await store.addOrder(order)
        res.json(newOrder)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

const updateOrder = async (req: Request, res: Response) => {
    if (!req.params.orderId) {
        res.status(400).json({ 'error': 'Please, specify a valid order id.' })
    }
    try {
        const order: Order = {
            status: req.body.status,
            user_id: req.body.user_id
        }
        const orderId = <number>(<unknown> req.params.orderId);
        const updatedOrder = await store.updateOrder(orderId, order);
        res.json(updatedOrder);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

const deleteOder = async (req: Request, res: Response) => {
    if (!req.params.orderId) {
        res.status(400).json({ 'error': 'Please, specify a valid order id.' })
    }
    try {
        const orderId = <number>(<unknown> req.params.orderId);
        const deleteOder = await store.deleteOrder(orderId)
        res.json(deleteOder)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

const addProduct = async (req: Request, res: Response) => {
    const orderId: number = parseInt(req.params.orderId);
    const productId: number = parseInt(req.body.productId);
    const quantity: number = parseInt(req.body.quantity);

    try {
        const getOrder = await store.getOrder(orderId);
        if (getOrder.status.toLowerCase() === "open") {
            const addedProduct = await store.addProduct(quantity, orderId, productId);
            res.json(addedProduct);
        } else {
            res.status(400).json({ message: `The order ${orderId} is closed therefore it is not possible to add more products.` })
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

const order_routes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:orderId', getOrder);
    app.put('/orders/:orderId', verifyAuthToken, updateOrder);
    app.post('/orders', verifyAuthToken, addOrder);
    app.post('/orders/:orderId/products', verifyAuthToken, addProduct);
    app.delete('/orders/:orderId', verifyAuthToken, deleteOder);
};

export default order_routes;