import Client from '../database';

export type Order = {
    id?: number;
    status: string;
    user_id: Number;
};

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const { rows } = await conn.query(sql);
            conn.release();
            return rows;
        } catch (err) {
            throw new Error(`Error Getting all orders => ${err}`)
        }
    };

    async addOrder(order: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO orders(status, user_id) VALUES ($1, $2) RETURNING *`;
            const values = [order.status, order.user_id]
            const { rows } = await conn.query(sql, values);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Adding a new order => ${err}`)
        }
    };

    async getOrder(orderId: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * from orders WHERE id=${orderId}`;
            const { rows } = await conn.query(sql);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Getting an order => ${err}`)
        }
    };

    async updateOrder(orderId: number, orderInfo: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = `UPDATE orders SET status=$1, user_id=$2 WHERE id=($3) RETURNING *`;
            const { rows } = await conn.query(sql, [orderInfo.status, orderInfo.user_id, orderId]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Updating an order => ${err}`)
        }
    };

    async deleteOrder(orderId: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = `DELETE from orders WHERE id=($1) RETURNING *`;
            const { rows } = await conn.query(sql, [orderId]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Deleting an order => ${err}`)
        }
    };

    async addProduct(quantity: number, orderId: number, productId: number): Promise<Order> {
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [quantity, orderId, productId]);
            const order = result.rows[0];
            conn.release();

            return order;
        } catch (err) {
            throw new Error(`Could not add the product [${productId}] to the order [${orderId}] with Error: ${err}`)
        }

    }
}