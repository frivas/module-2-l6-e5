import express, { Request, Response } from 'express';
import { Category, CategoryStore } from '../models/category';
import verifyAuthToken from '../middleware/verifyToken';

const store = new CategoryStore();

const index = async (_req: Request, res: Response) => {
    const categories = await store.index();
    res.json(categories);
};

const getCategory = async (req: Request, res: Response) => {
    if (!req.params.categoryId) {
        res.status(400).json({ error: 'Please, specify a valid category id.' });
    }
    try {
        const categoryId = <number>(<unknown>req.params.categoryId);
        const category = await store.getCategory(categoryId);
        res.json(category);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const addCategory = async (req: Request, res: Response) => {
    try {
        const category: Category = {
            name: req.body.name
        };

        const newCategory = await store.addCategory(category);
        res.json(newCategory);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const updateCategory = async (req: Request, res: Response) => {
    if (!req.params.categoryId) {
        res.status(400).json({ error: 'Please, specify a valid category id.' });
    }
    try {
        const category: Category = {
            id: parseInt(req.params.categoryId),
            name: req.body.name
        };
        const categoryId = <number>(<unknown>req.params.categoryId);
        const updatedCategory = await store.updateCategory(
            categoryId,
            category
        );
        res.json(updatedCategory);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const deleteCategory = async (req: Request, res: Response) => {
    if (!req.params.categoryId) {
        res.status(400).json({ error: 'Please, specify a valid category id.' });
    }
    try {
        const categoryId = <number>(<unknown>req.params.categoryId);
        const deletedCategory = await store.deleteCategory(categoryId);
        res.json(deletedCategory);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const categories_routes = (app: express.Application) => {
    app.get('/categories', index);
    app.get('/categories/:categoryId', getCategory);
    app.put('/categories/:categoryId', verifyAuthToken, updateCategory);
    app.post('/categories', verifyAuthToken, addCategory);
    app.delete('/categories/:categoryId', verifyAuthToken, deleteCategory);
};

export default categories_routes;
