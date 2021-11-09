import supertest from 'supertest';
import app from '../../server';

import { Category } from '../../models/category';

const request = supertest(app);

let token: string;

async function login() {
    const credentials = {
        username: 'trex',
        password: 'test123'
    };
    const response = await request.post('/login').send(credentials);
    return response.body;
}

describe('Category Test Suite', () => {
    it('Check server is up and running', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        expect(response.text).toEqual(
            JSON.stringify({ message: 'Server is Up!' })
        );
    });

    it('[GET] Index: All categories.', async () => {
        const response = await request.get('/categories');
        expect(response.status).toBe(200);
        expect(response.text).toEqual(JSON.stringify([]));
    });

    it('[POST] Category: Create a new category.', async () => {
        const newUser = {
            username: 'trex',
            first_name: 'Tyrell',
            last_name: 'Rexomberg',
            age: 30,
            email: 'trex@gmail.com',
            password: 'test123'
        };
        await request.post('/users').send(newUser);

        token = await login();
        const data = {
            name: 'Cooking'
        };
        const expectedData = {
            id: 1,
            name: 'Cooking'
        };
        const response = await request
            .post('/categories')
            .send(data)
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.text).toEqual(JSON.stringify(expectedData));
    });

    it('[GET] Category: Get Category By ID', async () => {
        token = await login();
        const expectedCategory: Category = { id: 1, name: 'Cooking' };
        const response = await request.get('/categories/1');
        expect(response.status).toBe(200);
        expect(response.text).toBe(JSON.stringify(expectedCategory));
    });

    it('[PUT] Category: Update Category', async () => {
        token = await login();
        const expectedCategory: Category = { id: 1, name: 'Crime' };
        const updateCategory: Category = { name: 'Crime' };
        const response = await request
            .put('/categories/1')
            .send(updateCategory)
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.text).toBe(JSON.stringify(expectedCategory));
    });

    it('[DELETE] Category: Delete Category', async () => {
        token = await login();
        const response = await request
            .delete('/categories/1')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
});
