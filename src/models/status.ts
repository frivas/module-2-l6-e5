import Client from '../database';

export type Status = {
    id?: number;
    name: string;
};

export class StatusStore {
    async index(): Promise<Status[]> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM status';
        const { rows } = await conn.query(sql);
        conn.release();
        return rows;
    }

    async addStatus(status: Status): Promise<Status> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO status(name) VALUES ($1) RETURNING *`;
            const values = [status.name];
            const { rows } = await conn.query(sql, values);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Adding a new status => ${err}`);
        }
    }

    async getStatus(statusId: number): Promise<Status> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * from status WHERE id=${statusId}`;
            const { rows } = await conn.query(sql);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Getting a status => ${err}`);
        }
    }

    async updateStatus(statusId: number, statusInfo: Status): Promise<Status> {
        try {
            const conn = await Client.connect();
            const sql = `UPDATE status SET name=($1) WHERE id=($2) RETURNING *`;
            const { rows } = await conn.query(sql, [statusInfo.name, statusId]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error updating a status => ${err}`);
        }
    }

    async deleteStatus(statusId: number): Promise<Status> {
        try {
            const conn = await Client.connect();
            const sql = `DELETE from status WHERE id=($1) RETURNING *`;
            const { rows } = await conn.query(sql, [statusId]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Deleting a status => ${err}`);
        }
    }
}
