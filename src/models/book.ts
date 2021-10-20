import Client from '../database';

export type Book = {
    id?: number;
    title: string;
    total_pages: number;
    author: string;
    type: string;
    summary: string;
};

export class BookStore {
    async index(): Promise<Book[]> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM books';
        const { rows } = await conn.query(sql);
        conn.release();
        return rows;
    }

    async addBook(book: Book): Promise<Book> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO books(title, total_pages, author, type, summary) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const values = [book.title, book.total_pages, book.author, book.type, book.summary]
            const { rows } = await conn.query(sql, values);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Adding a new book => ${err}`)
        }
    }

    async getBook(bookId: number): Promise<Book> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * from books WHERE id=${bookId}`;
            const { rows } = await conn.query(sql);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Getting a new book => ${err}`)
        }
    }

    async updateBook(bookId: number, bookInfo: Book): Promise<Book> {
        try {
            const conn = await Client.connect();
            const sql = `UPDATE books SET title=$1, total_pages=$2, author=$3, type=$4, summary=$5 WHERE id=($6) RETURNING *`;
            const { rows } = await conn.query(sql, [bookInfo.title, bookInfo.total_pages, bookInfo.author, bookInfo.type, bookInfo.summary, bookId]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error updating a book => ${err}`)
        }
    }

    async deleteBook(bookId: number): Promise<Book> {
        try {
            const conn = await Client.connect();
            const sql = `DELETE from books WHERE id=($1) RETURNING *`;
            const { rows } = await conn.query(sql, [bookId]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Deleting a new book => ${err}`)
        }
    }
}