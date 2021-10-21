import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../middleware/verifyToken';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
};

const getProduct = async (req: Request, res: Response) => {
    if (!req.params.productId) {
        res.status(400).json({ 'error': 'Please, specify a valid product id.' })
    }
    try {
        const productId = <number>(<unknown> req.params.bookId);
        const product = await store.getProduct(productId)
        res.json(product)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

const addProduct = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category_id: req.body.category_id
        }

        const newProduct = await store.addProduct(product)
        res.json(newProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

const updateProduct = async (req: Request, res: Response) => {
    if (!req.params.productId) {
        res.status(400).json({ 'error': 'Please, specify a valid product id.' })
    }
    try {
        const product: Product = {
            id: parseInt(req.params.productId),
            name: req.body.name,
            price: req.body.price,
            category_id: req.body.category_id
        }
        const productId = <number>(<unknown> req.params.productId);
        const updateProduct = await store.updateProduct(productId, product);
        res.json(updateProduct);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    if (!req.params.productId) {
        res.status(400).json({ 'error': 'Please, specify a valid product id.' })
    }
    try {
        const productId = <number>(<unknown> req.params.productId);
        const deletedProduct = await store.deleteProduct(productId)
        res.json(deletedProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

const products_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:productId', getProduct);
    app.put('/products/:productId', verifyAuthToken, updateProduct);
    app.post('/products', verifyAuthToken, addProduct);
    app.delete('/products/:productId', verifyAuthToken, deleteProduct);
};

export default products_routes