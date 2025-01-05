# Service: products

This service is responsible to manage the products stock.

## API

### Public functionalities

1. List all products (client)
2. Find product by id (client)
3. Create product (admin)
4. Delete product (admin)
5. Update product (admin)

### Public endpoints

1. **GET** /products
2. **GET** /products/:id
3. **POST** /products
4. **DELETE** /products/:id
5. **PUT** /products/:id

## Dependencies

### Used by

- carts service

### Dependencies Diagram

<img src="./products-service.png" alt="products-service" />

## Running service using Docker

### 1. Setup .env file

Create a file called .env on project's root folder, and put something like this inside:

```
# Database
DB_URI=mongodb://database:27017
DB_NAME=products-db
DB_USER=admin
DB_PASSWORD=admin
DB_PORT=27017

# Server
SERVER_PORT=8080
RABBIT_MQ_URL=amqp://admin:admin@rabbitmq
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
docker network connect ecommerce-soa products-nest-api
```

## Reminder

Of course in a real world situation we don't wanna run all the services in the same machine, that is the opposite of a distribute service oriented architecture, doing that you just increase the project complexity and don't gain the benefits of this architecture.

I'm doing this because I value my money and don't want to owe the value of a house to AWS services.
