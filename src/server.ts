import express, { Request, Response } from 'express';
import client from './database';
import books_routes from './handlers/books';
import users_routes from './handlers/users';
import order_routes from './handlers/orders';
import products_routes from './handlers/products';
import dashboard_routes from './handlers/dashboard';
import categories_routes from './handlers/categories';
import status_routes from './handlers/statuses';

const app: express.Application = express()
const address: string = '0.0.0.0:3000'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req: Request, res: Response) => {
    try {
        client.connect()
        let result = await client.query('SELECT NOW()');
        console.log(result.rows);
        client.end()
        res.send('Hello World!')
    } catch (err) {
        throw new Error(`Error => ${err}`);
    }
})

books_routes(app);
users_routes(app);
order_routes(app);
products_routes(app);
dashboard_routes(app);
categories_routes(app);
status_routes(app);

app.listen(3000, () => {
    console.log(`starting app on: ${address}`)
})