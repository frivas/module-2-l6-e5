import Client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const { rows } = await conn.query(sql);
            conn.release();
            return rows;

        } catch (err) {
            throw new Error(`Error Getting all producs => ${err}`)
        }
    };

    async addProduct(product: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO products(name, price) VALUES ($1, $2) RETURNING *`;
            const values = [product.name, product.price]
            const { rows } = await conn.query(sql, values);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Adding a new product => ${err}`)
        }
    };

    async getProduct(productId: number): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * from products WHERE id=${productId}`;
            const { rows } = await conn.query(sql);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Getting a new product => ${err}`)
        }
    };

    async updateProduct(productId: number, productInfo: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `UPDATE products SET name=$1, price=$2 WHERE id=($3) RETURNING *`;
            const { rows } = await conn.query(sql, [productInfo.name, productInfo.price, productId]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Updating a product => ${err}`)
        }
    };

    async deleteProduct(productId: number): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `DELETE from products WHERE id=($1) RETURNING *`;
            const { rows } = await conn.query(sql, [productId]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Deleting a product => ${err}`)
        }
    };
}