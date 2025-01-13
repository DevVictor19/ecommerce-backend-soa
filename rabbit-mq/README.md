# RabbitMQ

This is just a folder with some docker-compose files to you run locally on your machine.

## Starting RabbitMQ

### 1. Start container

Just run:

```
docker compose up -d
```

If you wanna access the RabbitMQ dashboard on browser run the **docker-compose.dev.yml**

### 2. Connect to private network

All the containers will run on the same docker network called **ecommerce-soa**.

If you haven't created it yet just run:

```
docker network create ecommerce-soa
```

If you already done this step, just connect with it

```
docker network connect ecommerce-soa rabbitmq
```

## Reminder

Of course in a real world situation we don't wanna run all the services in the same machine, that is the opposite of a distribute service oriented architecture, doing that you just increase the project complexity and don't gain the benefits of this architecture.

I'm doing this because I value my money and don't want to owe the value of a house to AWS services.
