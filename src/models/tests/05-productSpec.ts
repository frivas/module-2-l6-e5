import { Product, ProductStore } from '../product';
import { Status, StatusStore } from '../status';
import { UserStore } from '../user';
import { CategoryStore } from '../category';

const store = new ProductStore();
const statusStore = new StatusStore();
const userStore = new UserStore();
const categoryStore = new CategoryStore();

describe('Product Store Model ', () => {
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

        const newCategory = {
            name: 'Technology'
        };
        await userStore.addUser(newUser);
        await statusStore.addStatus(openStatus);
        await statusStore.addStatus(closedStatus);
        await categoryStore.addCategory(newCategory);
    });

    it('Should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('Should have a Create method', () => {
        expect(store.addProduct).toBeDefined();
    });

    it('Should have a Read method', () => {
        expect(store.getProduct).toBeDefined();
    });

    it('Should have an Update method', () => {
        expect(store.updateProduct).toBeDefined();
    });

    it('Should have an Delete method', () => {
        expect(store.deleteProduct).toBeDefined();
    });

    it('Index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toBeInstanceOf(Array);
    });

    it('Create method: creates a new product and returns it.', async () => {
        const newProduct: Product = {
            name: 'Product_1',
            price: 3,
            category_id: 3
        };

        const expectedProduct = {
            id: 1,
            name: 'Product_1',
            price: 3,
            category_id: jasmine.any(String)
        };
        const result = await store.addProduct(newProduct);
        expect(result).toEqual(expectedProduct);
    });

    it('Read method: returns a specific product by its id.', async () => {
        const expectedProduct = {
            id: 1,
            name: 'Product_1',
            price: 3,
            category_id: jasmine.any(String)
        };
        const result = await store.getProduct(1);
        expect(result).toEqual(expectedProduct);
    });

    it('Update method: updates a specific product by its id and the data to be changed.', async () => {
        const updateProduct: Product = {
            name: 'Product_Test',
            price: 10,
            category_id: 3
        };
        const expectedProduct = {
            id: 1,
            name: 'Product_Test',
            price: 10,
            category_id: jasmine.any(String)
        };
        const result = await store.updateProduct(1, updateProduct);
        expect(result).toEqual(expectedProduct);
    });

    it('Delete method: updates a specific product by its id.', async () => {
        const expectedProduct = {
            id: 1,
            name: 'Product_Test',
            price: 10,
            category_id: jasmine.any(String)
        };
        const result = await store.deleteProduct(1);
        expect(result).toEqual(expectedProduct);
    });
});
