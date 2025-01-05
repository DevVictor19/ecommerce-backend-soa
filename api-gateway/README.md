# Service: api-gateway

The api-gateway in a service oriented architecture is used to provide a gateway between the external world and all the services that live inside a private network.

Each service are hosted in a different machine with a different IP address, so each service has a unique url to communicate with.

The api-gateway work as a proxy providing a single public url, and each different endpoint is mapped to his correspondent service inside the private network.

Also, some services communicate with each other inside the private network. Using a api-gateway give me the possibility to expose only the endpoints that i want to be accessible outside the network.

## Exposed endpoints

All the endpoints are accessible on the same host (http://localhost:8080), and will be proxied to their respective service dns inside the private network.

#### Auth

- **POST** /auth/login
- **POST** /auth/signup

#### Carts

- **GET** /carts/my-cart
- **DELETE** /carts/my-cart
- **POST** /carts/my-cart/products/:id
- **DELETE** /carts/my-cart/products/:id

#### Orders

- **GET** /orders
- **GET** /orders/my-orders
- **POST** /orders/my-orders
- **DELETE** /orders/my-orders/:orderId
- **POST** /orders/my-orders/:orderId/payments/credit

#### Products

- **GET** /products
- **GET** /products/:id
- **POST** /products
- **DELETE** /products/:id
- **PUT** /products/:id

## Running service using Docker

### 1. Setup .env file

Create a file called .env on project's root folder, and put something like this inside:

```
# server
SERVER_PORT=8080
SERVER_JWT_SECRET=secret

# services
USERS_SERVICE=http://users-nest-api:8080
PRODUCTS_SERVICE=http://products-nest-api:8080
CARTS_SERVICE=http://carts-nest-api:8080
ORDERS_SERVICE=http://orders-nest-api:8080
```

### 2. Starting the service

Tu run in production mode just go to the project's root folder and run:

```
docker compose up -d
```

### 3. Connect to private network

All the containers will run on the same docker network called **ecommerce-soa**.

If you haven't created it yet just run:

```
docker network create ecommerce-soa
```

If you already done this step, just connect with it

```
docker network connect ecommerce-soa fastify-api-gateway
```

## Reminder

Of course in a real world situation we don't wanna run all the services in the same machine, that is the opposite of a distribute service oriented architecture, doing that you just increase the project complexity and don't gain the benefits of this architecture.

I'm doing this because I value my money and don't want to owe the value of a house to AWS services.
