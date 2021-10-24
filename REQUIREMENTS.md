# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

-   **API Endpoint: /products**
-   Index: `/products [GET]`
-   Show (args: productId): `/products/:id [GET]`
-   Create (args: Product)[token required]: `/products [POST]`
-   Update (args: ProductId, Product)[token required]: `/products/:id [PUT]`
-   Delete (args: ProductId)[token required]: `/products/:id [DELETE]`

#### Users

-   **API Endpoint: /users**
-   Index: `/users [GET]`
-   Show (args: userId): `/users/:id [GET]`
-   Create (args: User)[token required]: `/users [POST]`
-   Update (args: UserId, User)[token required]: `/users/:id [PUT]`
-   Delete (args: UserId)[token required]: `/users/:id [DELETE]`

#### Orders

-   **API Endpoint: /orders**
-   Index: `/orders [GET]`
-   Show (args: orderId): `/orders/:id [GET]`
-   Create (args: Order)[token required]: `/orders [POST]`
-   Update (args: orderId, Order)[token required]: `/orders/:id [PUT]`
-   Delete (args: orderId)[token required]: `/orders/:id [DELETE]`
-   Current Order by user (args: userId)[token required]: `/orders/user/:user_id [GET]`
-   [OPTIONAL] Completed Orders by user (args: userId)[token required]: `/orders/:user_id/completed [GET]`

#### Categories

-   **API Endpoint: /categories**
-   Index: `/categories [GET]`
-   Show (args: categoryId): `/categories/:id [GET]`
-   Create (args: Category)[token required]: `/categories [POST]`
-   Update (args: categoryId, Category)[token required]: `/categories/:id [PUT]`
-   Delete (args: categoryId)[token required]: `/categories/:id [DELETE]`

#### Status

-   **API Endpoint: /statuses**
-   Index: `/statuses [GET]`
-   Show (args: statusId): `/statuses/:id [GET]`
-   Create (args: Status)[token required]: `/statuses [POST]`
-   Update (args: statusId, Status)[token required]: `/statuses/:id [PUT]`
-   Delete (args: statusId)[token required]: `/statuses/:id [DELETE]`

#### Dashboard

-   [OPTIONAL] Top 5 most popular products: `/popular/<number> [GET]`
-   [OPTIONAL] Products by category (args: product category); `/products_in_category/ [GET]`
-   [OPTIONAL] Products by category (args: product category); `/expensive_products/<number> [GET]`
-   [OPTIONAL] Products by category (args: product category); `/users_with_orders/ [GET]`



## Data Shapes

#### Product

-   id
-   name
-   price
-   [OPTIONAL] category_id
-   DB Table Schema: Product(id:integer primary key, name:varchar, price:decimal, category_id:integer[foreign key to Category])

#### User

-   id
-   first_name
-   last_name
-   age
-   email
-   password_digest
-   DB Table Schema: User(id: integer primary key, first_name varchar, last_name varchar, age integer, email varchar, password_digest varchar)

#### Orders

-   id
-   user_id
-   status of order (open, completed, closed)
-   DB Table Schema: Orders(id: integer primary key, user_id:integer[foreign key to User], status: integer[foreign key to Status])

#### Products_Orders

-   id
-   product_id
-   quantity
-   user_id
-   DB Table Schema: Orders(id: integer primary key, product_id: integer[foreign key to Product], quantity: integer, user_id:integer[foreign key to User])

#### Category

-   id
-   name
-   DB Table Schema: Category(id: integer primary key, name: varchar)

#### Status

-   id
-   name (open, completed, closed)
-   DB Table Schema: Status(id: integer primary key, name: varchar)
