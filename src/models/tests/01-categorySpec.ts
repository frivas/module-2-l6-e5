import { Category, CategoryStore } from '../category';

const store = new CategoryStore();

describe('Category Store Model ', () => {
    it('Should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('Should have a Create method', () => {
        expect(store.addCategory).toBeDefined();
    });

    it('Should have a Read method', () => {
        expect(store.getCategory).toBeDefined();
    });

    it('Should have an Update method', () => {
        expect(store.updateCategory).toBeDefined();
    });

    it('Should have an Delete method', () => {
        expect(store.deleteCategory).toBeDefined();
    });

    it('Index method should return a list of categories', async () => {
        const result = await store.index();
        expect(result).toBeInstanceOf(Array);
    });

    it('Create method: creates a new category and returns it.', async () => {
        const newCategory: Category = {
            name: 'Crime'
        };

        const expectedCategory: Category = {
            id: 1,
            name: 'Crime'
        };
        const result = await store.addCategory(newCategory);
        expect(result).toEqual(expectedCategory);
    });

    it('Read method: returns a specific category by its id.', async () => {
        const expectedCategory: Category = {
            id: 1,
            name: 'Crime'
        };
        const result = await store.getCategory(1);
        expect(result).toEqual(expectedCategory);
    });

    it('Update method: updates a specific category by its id and the data to be changed.', async () => {
        const expectedCategory: Category = {
            id: 1,
            name: 'Economy'
        };
        const result = await store.updateCategory(1, expectedCategory);
        expect(result).toEqual(expectedCategory);
    });

    it('Delete method: updates a specific category by its id.', async () => {
        const expectedCategory: Category = {
            id: 1,
            name: 'Economy'
        };
        const result = await store.deleteCategory(1);
        expect(result).toEqual(expectedCategory);
    });
});
