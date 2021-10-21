import Client from '../database';
import bcrypt from 'bcrypt';

export type User = {
    id?: Number;
    username: string;
    first_name: string;
    last_name: string;
    age: Number;
    email: string;
    password_digest: string;
};

export class UserStore {
    async index(): Promise<User[]> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM users';
        const { rows } = await conn.query(sql);
        conn.release();
        return rows;
    };

    async addUser(user: User): Promise<User> {
        try {
            const saltRounds: string = process.env.SALT_ROUNDS!;
            const pepper = process.env.BCRYPT_PASSWORD;
            const hash = bcrypt.hashSync(user.password_digest + pepper, parseInt(saltRounds));
            const conn = await Client.connect();
            const sql = `INSERT INTO users(username, first_name, last_name, age, email, password_digest) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
            const values = [user.username, user.first_name, user.last_name, user.age, user.email, hash]
            const { rows } = await conn.query(sql, values);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Adding a new user => ${err}`)
        }
    };

    async getUser(userId: Number): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * from users WHERE id=${userId}`;
            const { rows } = await conn.query(sql);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Getting a new user => ${err}`)
        }
    };

    async updateUser(userId: Number, userInfo: User): Promise<User> {
        try {
            const saltRounds: string = process.env.SALT_ROUNDS!;
            const pepper = process.env.BCRYPT_PASSWORD;
            const hash = bcrypt.hashSync(userInfo.password_digest + pepper, parseInt(saltRounds));
            const conn = await Client.connect();
            const sql = `UPDATE users SET username=$1, first_name=$2, last_name=$3, age=$4, email=$5, password_digest=$6 WHERE id=($7) RETURNING *`;
            const { rows } = await conn.query(sql, [userInfo.username, userInfo.first_name, userInfo.last_name, userInfo.age, userInfo.email, hash, userId]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Updating a user => ${err}`)
        }
    };

    async deleteUser(userId: Number): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = `DELETE from users WHERE id=($1) RETURNING *`;
            const { rows } = await conn.query(sql, [userId]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(`Error Deleting a user => ${err}`)
        }
    };

    async authenticate(username: string, password: string): Promise<string | undefined> {
        try {
            const pepper = process.env.BCRYPT_PASSWORD;
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE username=($1)';

            const result = await conn.query(sql, [username]);

            if (result.rows.length) {
                const user = result.rows[0];

                if (bcrypt.compareSync(password + pepper, user.password_digest)) {
                    return user;
                }

                return undefined;
            };
        } catch (err) {
            return undefined;
        }
    };
};