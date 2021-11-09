import Client from '../database';

export type Category = {
    id?: number;
    name: string;
};

export class CategoryStore {
    async index(): Promise<Category[]> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM category';
        const { rows } = await conn.query(sql);
        conn.release();
        return rows;
    }

    async addCategory(category: Category): Promise<Category> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO category(name) VALUES ($1) RETURNING *`;
            const values = [category.name];
            const { rows } = await conn.query(sql, values);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Adding a new category => ${err}`);
        }
    }

    async getCategory(categoryId: number): Promise<Category> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * from category WHERE id=${categoryId}`;
            const { rows } = await conn.query(sql);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Getting a new category => ${err}`);
        }
    }

    async updateCategory(
        categoryId: number,
        categoryInfo: Category
    ): Promise<Category> {
        try {
            const conn = await Client.connect();
            const sql = `UPDATE category SET name=($1) WHERE id=($2) RETURNING *`;
            const { rows } = await conn.query(sql, [
                categoryInfo.name,
                categoryId
            ]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error updating a category => ${err}`);
        }
    }

    async deleteCategory(categoryId: number): Promise<Category> {
        try {
            const conn = await Client.connect();
            const sql = `DELETE from category WHERE id=($1) RETURNING *`;
            const { rows } = await conn.query(sql, [categoryId]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Deleting a category => ${err}`);
        }
    }
}
