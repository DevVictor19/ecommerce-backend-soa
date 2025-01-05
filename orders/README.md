# Service: orders

This service is responsible to manage all the user orders, and also start the payment process.

## API

### Public functionalities

1. List all orders (admin)
2. List user orders (client)
3. Create order (client)
4. Cancel order (client)
5. Pay order with credit card (client)

### Public endpoints

1. **GET** /orders
2. **GET** /orders/my-orders
3. **POST** /orders/my-orders
4. **DELETE** /orders/my-orders/:orderId
5. **POST** /orders/my-orders/:orderId/payments/credit

## Dependencies

### Uses

- carts service
- users service

### Dependencies Diagram

<img src="./orders-service.png" alt="orders-service" />

## Payment flow

<img src="./payment-flow.png" alt="payment-flow" />

## Running service using Docker

### 1. Setup .env file

Create a file called .env on project's root folder, and put something like this inside:

```
# Database
DB_URI=mongodb://database:27017
DB_NAME=orders-db
DB_USER=admin
DB_PASSWORD=admin
DB_PORT=27017

# Server
SERVER_PORT=8080
CART_SERVICE_URL=http://carts-nest-api:8080
USER_SERVICE_URL=http://users-nest-api:8080
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
docker network connect ecommerce-soa orders-nest-api
```

## Reminder

Of course in a real world situation we don't wanna run all the services in the same machine, that is the opposite of a distribute service oriented architecture, doing that you just increase the project complexity and don't gain the benefits of this architecture.

I'm doing this because I value my money and don't want to owe the value of a house to AWS services.
