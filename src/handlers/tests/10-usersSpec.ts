import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';

const request = supertest(app);

let token: string;

async function login() {
    const credentials = {
        username: 'trex',
        password: 'test123'
    };
    const response = await request.post('/login').send(credentials);
    // console.log(`Token => ${JSON.stringify(response.text, null, 2)}`);
    return response.body;
}

describe('User Test Suit', () => {
    it('Check server is up and running', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        expect(response.text).toEqual(
            JSON.stringify({ message: 'Server is Up!' })
        );
    });

    it('[POST] User: Create a User.', async () => {
        const newUser: User = {
            username: 'trex',
            first_name: 'Tyrell',
            last_name: 'Rexomberg',
            age: 30,
            email: 'trex@gmail.com',
            password: 'test123'
        };
        const response = await request.post('/users').send(newUser);
        expect(response.status).toBe(200);
    });

    it('[GET] Index: Get All Users', async () => {
        token = await login();
        const response = await request
            .get('/users')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });

    it('[GET] User: Get User By ID', async () => {
        token = await login();
        const response = await request
            .get('/users/1')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });

    it('[PUT] User: Update User', async () => {
        token = await login();
        const newUser: User = {
            username: 'trex',
            first_name: 'Tyron',
            last_name: 'Rexomberg',
            age: 30,
            email: 'trex@gmail.com',
            password: 'test123'
        };
        const response = await request
            .put('/users/1')
            .send(newUser)
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });

    it('[DELETE] User: Delete User', async () => {
        token = await login();
        const response = await request
            .delete('/users/1')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
});
