import express, { Request, Response } from 'express';
import { Book, BookStore } from '../models/book';
import verifyAuthToken from '../middleware/verifyToken';

const store = new BookStore();

const index = async (_req: Request, res: Response) => {
    const books = await store.index();
    res.json(books);
};

const getBook = async (req: Request, res: Response) => {
    if (!req.params.bookId) {
        res.status(400).json({ 'error': 'Please, specify a valid book id.' })
    }
    try {
        const bookId = <number>(<unknown> req.params.bookId);
        const book = await store.getBook(bookId)
        res.json(book)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

const addBook = async (req: Request, res: Response) => {
    try {
        const book: Book = {
            title: req.body.title,
            author: req.body.author,
            type: req.body.type,
            total_pages: req.body.total_pages,
            summary: req.body.summary
        }

        const newBook = await store.addBook(book)
        res.json(newBook)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

const updateBook = async (req: Request, res: Response) => {
    if (!req.params.bookId) {
        res.status(400).json({ 'error': 'Please, specify a valid book id.' })
    }
    try {
        const book: Book = {
            id: parseInt(req.params.bookId),
            title: req.body.title,
            author: req.body.author,
            type: req.body.type,
            total_pages: req.body.total_pages,
            summary: req.body.summary
        }
        const bookId = <number>(<unknown> req.params.bookId);
        const updatedBook = await store.updateBook(bookId, book)
        res.json(updatedBook)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const deleteBook = async (req: Request, res: Response) => {
    if (!req.params.bookId) {
        res.status(400).json({ 'error': 'Please, specify a valid book id.' })
    }
    try {
        const bookId = <number>(<unknown> req.params.bookId);
        const deleted = await store.deleteBook(bookId)
        res.json(deleted)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

const books_routes = (app: express.Application) => {
    app.get('/books', index);
    app.get('/books/:bookId', getBook);
    app.put('/books/:bookId', verifyAuthToken, updateBook);
    app.post('/books', verifyAuthToken, addBook);
    app.delete('/books/:bookId', verifyAuthToken, deleteBook);
};

export default books_routes