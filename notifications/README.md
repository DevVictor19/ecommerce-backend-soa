# Service: notifications

This service is responsible to listen application events and send emails according to the event type.

This service is fully private, that means he doesn't communicate with the external world, only listen to events inside the private network and responds to it.

Here we're using RabbitMQ to enqueue the events, and let the notifications service consumes it.

## Functionalities

- Send email for the user after order creation
- Send email for the user after a successful order payment
- Send email for the user after a unsuccessful order payment

## Events

- order-paid
- order-payment-failed
- order-payment-succeed

## Diagram

<img src="./notification-service.png" alt="notifications-service" />

## Running service using Docker

### 1. Setup .env file

Create a file called .env on project's root folder, and put something like this inside:

```
RABBIT_MQ_URL=amqp://admin:admin@rabbitmq

# Mail
MAIL_HOST_USER=your gmail address
MAIL_HOST_NAME=your name
MAIL_HOST_PASSWORD=your gmail app password
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
docker network connect ecommerce-soa notifications-nest-api
```

## Reminder

Of course in a real world situation we don't wanna run all the services in the same machine, that is the opposite of a distribute service oriented architecture, doing that you just increase the project complexity and don't gain the benefits of this architecture.

I'm doing this because I value my money and don't want to owe the value of a house to AWS services.
