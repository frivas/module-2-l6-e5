import express, { Request, Response } from 'express';

import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
    const products = await dashboard.productsInOrders();
    res.json(products);
};

const getAllUsersOrders = async (_req: Request, res: Response) => {
    try {
        const users = await dashboard.getAllUsersOrder();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const getMostExpensiveProducts = async (req: Request, res: Response) => {
    try {
        const numberOfProducts = parseInt(req.params.limit);
        const products = await dashboard.getMostExpensiveProducts(
            numberOfProducts
        );
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const getMostPopularProducts = async (req: Request, res: Response) => {
    try {
        const numberOfProducts = parseInt(req.params.limit);
        const products = await dashboard.getMostPopularProducts(
            numberOfProducts
        );
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const getProductsByCategory = async (req: Request, res: Response) => {
    try {
        const products = await dashboard.getProductsByCategory();
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const dashboard_routes = (app: express.Application) => {
    app.get('/products_in_orders', productsInOrders);
    app.get('/users_with_orders', getAllUsersOrders);
    app.get('/expensive_products/:limit', getMostExpensiveProducts);
    app.get('/popular/:limit', getMostPopularProducts);
    app.get('/products_in_category', getProductsByCategory);
};

export default dashboard_routes;
