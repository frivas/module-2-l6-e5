import Client from '../database'

export class DashboardQueries {
    // Get all products that have been included in orders
    async productsInOrders(): Promise<{ name: string, price: number, order_id: string }[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT name, price, order_id FROM products INNER JOIN order_products ON product.id = order_products.id'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`unable get products and orders: ${err}`)
        }
    };

    async getAllUsersOrder(): Promise<unknown> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id`;
            const { rows } = await conn.query(sql);
            conn.release();
            return rows;
        } catch (err) {
            throw new Error(`Error Getting a all users with orders => ${err}`)
        }
    };

    async getMostExpensiveProducts(numberOfProducts: number): Promise<unknown> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM products ORDER BY price DESC Limit ${numberOfProducts}`;
            const { rows } = await conn.query(sql);
            conn.release();
            return rows;
        } catch (err) {
            throw new Error(`Error Getting the ${numberOfProducts} most expensive products => ${err}`)
        }
    };
}
