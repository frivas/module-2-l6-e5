# Project Specification

### Comments

- The backend is inside the `api` folder.

- **The scripts available are:**

  - `npm run test` it will transpile, perform the migrations and then execute jasmine.
  - `npm run perfect` it will execute prettier and lint.
  - `npm run compile` it will transpile the code using `tsc`.
  - `npm run build` it will clean the `dist/` folder, execute the `clean`, `perfect` and `compile` scripts.
  - `npm run start` it will start `nodemon`  on `src/index.ts`
  - You can also execute `node dist/` to run the app.

- **Endpoints:**

  - http://localhost:3000/ = Will show a message stating the server is up and running.
  - **Category**
    - GET http://localhost:3000/categories = shows a list of all the categories.
    - GET http://localhost:3000/categories/categoryId = shows a category by its id.
    - PUT http://localhost:3000/categories/categoryId = Updates a category based on its id. You need to be authenticated for that.
    - POST http://localhost:3000/categories = Create a new category. You need to be authenticated for that.
    - DELETE http://localhost:3000/categories/categoryId = Delete a category. You need to be authenticated for that.
  - **Status**
    - GET http://localhost:3000/statuses = shows a list of all the status.
    - GET http://localhost:3000/statuses/statusId = shows a status by its id.
    - PUT http://localhost:3000/statuses/statusId = Updates a status based on its id. You need to be authenticated for that.
    - POST http://localhost:3000/statuses = Create a new status. You need to be authenticated for that.
    - DELETE http://localhost:3000/statuses/statusId = Delete a status. You need to be authenticated for that.
  - **Users**
    - GET http://localhost:3000/users = shows a list of all the user.
    - GET http://localhost:3000/users/userId = shows a user by its id.
    - PUT http://localhost:3000/users/usersId = Updates a user based on its id. You need to be authenticated for that.
    - POST http://localhost:3000/users = Create a new user. You need to be authenticated for that.
    - DELETE http://localhost:3000/users/userId = Delete a user. You need to be authenticated for that.
  - **Orders**
    - GET http://localhost:3000/orders = shows a list of all the order.
    - GET http://localhost:3000/orders/orderId = shows an order by its id.
    - GET http://localhost:3000/orders/user/username = get completed orders by user.
    - PUT http://localhost:3000/orders/orderId = Updates an orders based on its id. You need to be authenticated for that.
    - POST http://localhost:3000/orders = Create a new order. You need to be authenticated for that.
    - POST http://localhost:3000/orders/orderId/products = Adds a product to a specific order. You need to be authenticated for that.
    - DELETE http://localhost:3000/orders/orderId = Delete an orders. You need to be authenticated for that.
  - **Products**
    - GET http://localhost:3000/products = shows a list of all the product.
    - GET http://localhost:3000/products/productId = shows a product by its id.
    - PUT http://localhost:3000/products/productId = Updates a product based on its id. You need to be authenticated for that.
    - POST http://localhost:3000/products = Create a new product. You need to be authenticated for that.
    - DELETE http://localhost:3000/products/productId = Delete a product. You need to be authenticated for that.
  - **Books**
    - GET http://localhost:3000/books = shows a list of all the books.
    - GET http://localhost:3000/books/bookId = shows a book by its id.
    - PUT http://localhost:3000/books/bookId = Updates a book based on its id. You need to be authenticated for that.
    - POST http://localhost:3000/books = Create a new book. You need to be authenticated for that.
    - DELETE http://localhost:3000/books/bookId = Delete a book. You need to be authenticated for that.

  ## How to connect to the database

  Please execute the following steps in your terminal. You need to have docker installed:

  ```
  docker pull postgres
  docker run -d -e POSTGRES_PASSWORD=<password> -p 5432:5432 postgres
  ```

  

  This will run a docker instance to which the API will connect.

## Setup your environment variables

The API uses a `.env` it expects the following, below an example:

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shopping
POSTGRES_DB_TEST=shopping_test
POSTGRES_USER=shopping_user
POSTGRES_PASSWORD=password123
ENV=dev
BCRYPT_PASSWORD=this-is-not-a-test
SALT_ROUNDS=10
TOKEN_SECRET=iesu-serviam2021
```

## Ports

Postgres runs in port **5432** however you can specify one.

The API server runs in port **3000**.

## Install all packages needed

In your terminal run:

```
npm i
```



# Build a Storefront Backend

## README & Requirements Documentation

- [x] Create a `README.md` file containing project setup instructions.
  - [x] A reviewer must be able to follow the steps listed in the `README.md` to start the project. It should contain the following:
    - [x] how to setup and connect to the database
    - [x] what ports the backend and database are running on
    - [x] package installation instructions
- [x] Update the `REQUIREMENTS.md` with API route information
  - [x] The `REQUIREMENTS.md` must show the following: 
    - [x] correct RESTful routes for the required endpoints. 
    - [x] each RESTful route should be associated with the correct HTTP verb.
- [x] Update the `REQUIREMENTS.md` with a database schema. 
  - [x] The `REQUIREMENTS.md` must include a database schema that has tables and columns that address the API endpoints and data shapes given in the `REQUIREMENTS.md` including column types. 

## Database

- [x] Create a database and connect to it.
- [x] Design a basic relational database through tables, columns, and simple relationships between tables.
- [x] Write well formed and correct SQL queries to select, update,  delete, and where information.
- [x] Update a database to demonstrate usage/application of migrations.
- [x] Secure important information by adding salt to user passwords.

## Node/Express

- [x] Create CRUD endpoints for models in the application.
- [x] Crafting model files that aptly translate their database tables into useful entities in the Node application.
- [x] Evaluate and apply the best JavaScript and TypeScript code to achieve the desired functionality of their application.
- [x] Secure database access info with environment variables.

## Authentication & Testing

- [x] Write a test suite for the endpoints in the API.
- [x] Set up JWT tokens in your API using modern authentication methods. 
- [x] Write unit tests for the database actions in the application