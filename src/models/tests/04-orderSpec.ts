import { Order, OrderStore } from '../order';
import { Status, StatusStore } from '../status';
import { UserStore } from '../user';

const store = new OrderStore();
const statusStore = new StatusStore();
const userStore = new UserStore();

describe('Order Store Model ', () => {
    beforeAll(async () => {
        const openStatus: Status = {
            name: 'open'
        };
        const closedStatus = {
            name: 'closed'
        };
        const newUser = {
            username: 'trex',
            first_name: 'Tyrell',
            last_name: 'Rexomberg',
            age: 30,
            email: 'trex@gmail.com',
            password: 'test123'
        };
        await userStore.addUser(newUser);
        await statusStore.addStatus(openStatus);
        await statusStore.addStatus(closedStatus);
    });

    it('Should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('Should have a Create method', () => {
        expect(store.addOrder).toBeDefined();
    });

    it('Should have a Read method', () => {
        expect(store.getOrder).toBeDefined();
    });

    it('Should have an Update method', () => {
        expect(store.updateOrder).toBeDefined();
    });

    it('Should have an Delete method', () => {
        expect(store.deleteOrder).toBeDefined();
    });

    it('Index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toBeInstanceOf(Array);
    });

    it('Create method: creates a new order and returns it.', async () => {
        const newOrder: Order = {
            status_id: 2,
            user_id: 2
        };

        const expectedOrder = {
            id: 1,
            status_id: jasmine.any(String),
            user_id: jasmine.any(String)
        };
        const result = await store.addOrder(newOrder);
        expect(result).toEqual(expectedOrder);
    });

    it('Read method: returns a specific order by its id.', async () => {
        const expectedOrder = {
            id: 1,
            status_id: jasmine.any(String),
            user_id: jasmine.any(String)
        };
        const result = await store.getOrder(1);
        expect(result).toEqual(expectedOrder);
    });

    it('Update method: updates a specific order by its id and the data to be changed.', async () => {
        const updateOrder = {
            id: 1,
            status_id: 3,
            user_id: 2
        };
        const expectedOrder = {
            id: 1,
            status_id: jasmine.any(String),
            user_id: jasmine.any(String)
        };
        const result = await store.updateOrder(1, updateOrder);
        expect(result).toEqual(expectedOrder);
    });

    it('Delete method: updates a specific order by its id.', async () => {
        const expectedOrder = {
            id: 1,
            status_id: jasmine.any(String),
            user_id: jasmine.any(String)
        };
        const result = await store.deleteOrder(1);
        expect(result).toEqual(expectedOrder);
    });
});
