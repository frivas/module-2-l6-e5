# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints and Routes

#### Products

- **API Endpoint: /products**
- Index: `/products [GET]`
- Show (args: product id): `/products/:id [GET]`
- Create (args: Product)[token required]: `/products [POST]`
- [OPTIONAL] Top 5 most popular products: `/products?show=<number> [GET]`
- [OPTIONAL] Products by category (args: product category); `/products/:category [GET]`

#### Users

- **API Endpoint: /users**
- Index [token required]: `/users [GET]`
- Show (args: id)[token required]: `/users/:id [GET]`
- Create (args: User)[token required]: `/users/ [POST]`

#### Orders

- **API Endpoint: /orders**
- Current Order by user (args: user id)[token required]: `/orders/:user_id [GET]`
- [OPTIONAL] Completed Orders by user (args: user id)[token required]: `/orders/:user_id/completed [GET]`

## Data Shapes and Daatabase Table Schemas

#### Product

- id
- name
- price
- [OPTIONAL] category
- DB Table Schema: Product(id:integer primary key, name:varchar, price:decimal, categoryid:integer[foreign key to Category])

#### User

- id
- firstName
- lastName
- password
- DB Table Schema: User(id: integer primary key, firstName: varchar, lastName: varchar, password: varchar)

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
- DB Table Schema: Orders(id: integer primary key, product_id: integer[foreign key to Product], number_of_product: integer, user_id:integer[foreign key to User], status: integer[foreign key to Status])

#### Category

- id
- name
- DB Table Schema: Category(id: integer primary key, name: varchar)

#### Status

- id
- name
- DB Table Schema: Status(id: integer primary key, name: varchar)
