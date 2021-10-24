import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import { StatusStore } from '../models/status';
import verifyAuthToken from '../middleware/verifyToken';

const store = new OrderStore();
const statusStore = new StatusStore();

const index = async (_req: Request, res: Response) => {
    const orders = await store.index();
    res.json(orders);
};

const getOrder = async (req: Request, res: Response) => {
    if (!req.params.orderId) {
        res.status(400).json({ error: 'Please, specify a valid order id.' });
    }
    try {
        const orderId = <number>(<unknown>req.params.orderId);
        const order = await store.getOrder(orderId);
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const addOrder = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            status_id: parseInt(req.body.status_id),
            user_id: parseInt(req.body.user_id)
        };

        const newOrder = await store.addOrder(order);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const updateOrder = async (req: Request, res: Response) => {
    if (!req.params.orderId) {
        res.status(400).json({ error: 'Please, specify a valid order id.' });
    }
    try {
        const order: Order = {
            status_id: req.body.status_id,
            user_id: req.body.user_id
        };
        const orderId = <number>(<unknown>req.params.orderId);
        const updatedOrder = await store.updateOrder(orderId, order);
        res.json(updatedOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const deleteOder = async (req: Request, res: Response) => {
    if (!req.params.orderId) {
        res.status(400).json({ error: 'Please, specify a valid order id.' });
    }
    try {
        const orderId = <number>(<unknown>req.params.orderId);
        const deleteOder = await store.deleteOrder(orderId);
        res.json(deleteOder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const addProduct = async (req: Request, res: Response) => {
    const orderId: number = parseInt(req.params.orderId);
    const productId: number = parseInt(req.body.product_id);
    const quantity: number = parseInt(req.body.quantity);

    try {
        const getOrder = await store.getOrder(orderId);
        const getStatus = await statusStore.getStatus(getOrder.status_id);
        if (getOrder.status_id == getStatus.id) {
            const addedProduct = await store.addProduct(
                quantity,
                orderId,
                productId
            );
            res.json(addedProduct);
        } else {
            res.status(400).json({
                message: `The order ${orderId} is closed therefore it is not possible to add more products.`
            });
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

const getCompletedOrdersByUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const products = await store.getCompletedOrdersByUser(userId);
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const getOrdersByUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const products = await store.getOrdersByUser(userId);
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const order_routes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:orderId', getOrder);
    app.put('/orders/:orderId', verifyAuthToken, updateOrder);
    app.post('/orders', verifyAuthToken, addOrder);
    app.post('/orders/:orderId/products', verifyAuthToken, addProduct);
    app.delete('/orders/:orderId', verifyAuthToken, deleteOder);
    app.get(
        '/orders/:userId/completed',
        verifyAuthToken,
        getCompletedOrdersByUser
    );
    app.get('/orders/user/:userId', verifyAuthToken, getOrdersByUser);
};

export default order_routes;
