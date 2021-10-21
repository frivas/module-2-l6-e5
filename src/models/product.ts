import Client from '../database';

export type Product = {
    id?: Number;
    name: string;
    price: Number;
    category_id: Number;
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
            const sql = `INSERT INTO products(name, price, category_id) VALUES ($1, $2, $3) RETURNING *`;
            const values = [product.name, product.price, product.category_id]
            const { rows } = await conn.query(sql, values);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Adding a new product => ${err}`)
        }
    };

    async getProduct(productId: Number): Promise<Product> {
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

    async updateProduct(productId: Number, productInfo: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `UPDATE products SET name=$1, price=$2, category_id=$3 WHERE id=($4) RETURNING *`;
            const { rows } = await conn.query(sql, [productInfo.name, productInfo.price, productInfo.category_id, productId]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Updating a product => ${err}`)
        }
    };

    async deleteProduct(productId: Number): Promise<Product> {
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