import { Status, StatusStore } from '../status';

const store = new StatusStore();

describe('Status Store Model ', () => {
    it('Should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('Should have a Create method', () => {
        expect(store.addStatus).toBeDefined();
    });

    it('Should have a Read method', () => {
        expect(store.getStatus).toBeDefined();
    });

    it('Should have an Update method', () => {
        expect(store.updateStatus).toBeDefined();
    });

    it('Should have an Delete method', () => {
        expect(store.deleteStatus).toBeDefined();
    });

    it('Index method should return a list of categories', async () => {
        const result = await store.index();
        expect(result).toBeInstanceOf(Array);
    });

    it('Create method: creates a new status and returns it.', async () => {
        const newStatus: Status = {
            name: 'open'
        }

        const expectedStatus: Status = {
            id: 1,
            name: 'open'
        }
        const result = await store.addStatus(newStatus);
        expect(result).toEqual(expectedStatus);
    });

    it('Read method: returns a specific status by its id.', async () => {
        const expectedStatus: Status = {
            id: 1,
            name: 'open'
        }
        const result = await store.getStatus(1);
        expect(result).toEqual(expectedStatus);
    });

    it('Update method: updates a specific status by its id and the data to be changed.', async () => {
        const expectedStatus: Status = {
            id: 1,
            name: 'Economy'
        }
        const result = await store.updateStatus(1, expectedStatus);
        expect(result).toEqual(expectedStatus);
    });

    it('Delete method: updates a specific status by its id.', async () => {
        const expectedStatus: Status = {
            id: 1,
            name: 'Economy'
        }
        const result = await store.deleteStatus(1);
        expect(result).toEqual(expectedStatus);
    });
});