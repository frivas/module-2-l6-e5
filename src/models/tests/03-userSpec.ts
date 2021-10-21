import { User, UserStore } from '../user';
import bcrypt from 'bcrypt';

const store = new UserStore();

describe('User Store Model ', () => {
    it('Should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('Should have a Create method', () => {
        expect(store.addUser).toBeDefined();
    });

    it('Should have a Read method', () => {
        expect(store.getUser).toBeDefined();
    });

    it('Should have an Update method', () => {
        expect(store.updateUser).toBeDefined();
    });

    it('Should have an Delete method', () => {
        expect(store.deleteUser).toBeDefined();
    });

    it('Index method should return a list of users', async () => {
        const result = await store.index();
        expect(result).toBeInstanceOf(Array);
    });

    it('Create method: creates a new user and returns it.', async () => {
        const newUser: User = {
            username: 'trex',
            first_name: 'Tyrell',
            last_name: 'Rexomberg',
            age: 30,
            email: 'trex@gmail.com',
            password_digest: 'text123'
        }

        const expectedUser = {
            id: 1,
            username: 'trex',
            first_name: 'Tyrell',
            last_name: 'Rexomberg',
            age: 30,
            email: 'trex@gmail.com',
            password_digest: jasmine.any(String)
        }
        const result = await store.addUser(newUser);
        expect(result).toEqual(expectedUser);
    });

    it('Read method: returns a specific user by its id.', async () => {
        const expectedUser = {
            id: 1,
            username: 'trex',
            first_name: 'Tyrell',
            last_name: 'Rexomberg',
            age: 30,
            email: 'trex@gmail.com',
            password_digest: jasmine.any(String)
        }
        const result = await store.getUser(1);
        expect(result).toEqual(expectedUser);
    });

    it('Update method: updates a specific user by its id and the data to be changed.', async () => {
        const updateUser: User = {
            id: 1,
            username: 'trex',
            first_name: 'Tyron',
            last_name: 'Rexomberg',
            age: 30,
            email: 'trex@gmail.com',
            password_digest: 'test123'
        }


        const result = await store.updateUser(1, updateUser);
        const userInfo = await store.getUser(1);
        const expectedUser: User = {
            id: 1,
            username: 'trex',
            first_name: 'Tyron',
            last_name: 'Rexomberg',
            age: 30,
            email: 'trex@gmail.com',
            password_digest: userInfo.password_digest
        }
        expect(result).toEqual(expectedUser);
    });

    it('Delete method: updates a specific user by its id.', async () => {
        const expectedUser = {
            id: 1,
            username: 'trex',
            first_name: 'Tyron',
            last_name: 'Rexomberg',
            age: 30,
            email: 'trex@gmail.com',
            password_digest: jasmine.any(String)
        }
        const result = await store.deleteUser(1);
        expect(result).toEqual(expectedUser);
    });
});