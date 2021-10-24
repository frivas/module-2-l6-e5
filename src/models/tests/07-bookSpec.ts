import { Book, BookStore } from '../book';

const store = new BookStore();

describe('Book Store Model ', () => {
    it('Should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('Should have a Create method', () => {
        expect(store.addBook).toBeDefined();
    });

    it('Should have a Read method', () => {
        expect(store.getBook).toBeDefined();
    });

    it('Should have an Update method', () => {
        expect(store.updateBook).toBeDefined();
    });

    it('Should have an Delete method', () => {
        expect(store.deleteBook).toBeDefined();
    });

    it('Index method should return a list of books', async () => {
        const result = await store.index();
        expect(result).toBeInstanceOf(Array);
    });

    it('Create method: creates a new entry and returns it.', async () => {
        const newBook: Book = {
            title: 'La cena del Cordero',
            author: 'Scott Hahn',
            total_pages: 204,
            type: 'Religion',
            summary: 'La Misa, el cielo en la tierra.'
        };

        const expectedBook = {
            id: 1,
            title: 'La cena del Cordero',
            author: 'Scott Hahn',
            total_pages: 204,
            type: 'Religion',
            summary: 'La Misa, el cielo en la tierra.'
        };
        const result = await store.addBook(newBook);
        expect(result).toEqual(expectedBook);
    });

    it('Read method: returns a specific book by its id.', async () => {
        const expectedBook = {
            id: 1,
            title: 'La cena del Cordero',
            author: 'Scott Hahn',
            total_pages: 204,
            type: 'Religion',
            summary: 'La Misa, el cielo en la tierra.'
        };
        const result = await store.getBook(1);
        expect(result).toEqual(expectedBook);
    });

    it('Update method: updates a specific book by its id and the data to be changed.', async () => {
        const expectedBook = {
            id: 1,
            title: 'La cena del Cordero',
            author: 'Scott Hahn',
            total_pages: 205,
            type: 'Religion',
            summary: 'La Misa, el cielo en la tierra. Un libro magnifico.'
        };
        const result = await store.updateBook(1, expectedBook);
        expect(result).toEqual(expectedBook);
    });

    it('Delete method: updates a specific book by its id.', async () => {
        const expectedBook = {
            id: 1,
            title: 'La cena del Cordero',
            author: 'Scott Hahn',
            total_pages: 205,
            type: 'Religion',
            summary: 'La Misa, el cielo en la tierra. Un libro magnifico.'
        };
        const result = await store.deleteBook(1);
        expect(result).toEqual(expectedBook);
    });
});
