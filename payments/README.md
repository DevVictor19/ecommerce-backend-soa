# Service: payments

This service is responsible to process the payments requests. It's fully private and consumes a queue to process each payment request.

Here we are using RabbitMQ to process payments asynchronously and then emitting events to the notification service.

## Functionalities

- Consume the payments queue to process each payment

## ASAAS (Payments Gateway)

In this service we are using <a href="https://docs.asaas.com/reference/about-this-doc" target="__blank">ASAAS</a> as the payment gateway, so you have to configure a sandbox account to use it.

## Dependencies

### Uses

- products service

### Diagram

<img src="./payments-service.png" alt="payments-service" />

## Running service using Docker

### 1. Setup .env file

Create a file called .env on project's root folder, and put something like this inside:

```
# Server
PRODUCT_SERVICE_URL=http://products-nest-api:8080
RABBIT_MQ_URL=amqp://admin:admin@rabbitmq

# Gateways
PAYMENT_GW_URL=https://sandbox.asaas.com/api/v3
PAYMENT_GW_KEY=your asaas key
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
docker network connect ecommerce-soa payments-nest-api
```

## Reminder

Of course in a real world situation we don't wanna run all the services in the same machine, that is the opposite of a distribute service oriented architecture, doing that you just increase the project complexity and don't gain the benefits of this architecture.

I'm doing this because I value my money and don't want to owe the value of a house to AWS services.
