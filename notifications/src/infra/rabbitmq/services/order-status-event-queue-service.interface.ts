export type EventProduct = { id: string; inCartQuantity: number };

export type OrderPaymentFailedEvent = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  order: {
    id: string;
    price: number;
    products: EventProduct[];
  };
  payment: {
    method: string;
    parcels: number;
    transactionCode: null;
  };
};

export type OrderPaymentSucceedEvent = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  order: {
    id: string;
    price: number;
    products: EventProduct[];
  };
  payment: {
    method: string;
    parcels: number;
    transactionCode: string;
  };
};

export type OrderCreatedEvent = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  order: {
    id: string;
    price: number;
    products: EventProduct[];
  };
};

export abstract class OrderStatusEventQueueService {
  abstract consumePaymentFailedEvent(
    onEvent: (event: OrderPaymentFailedEvent) => void,
  ): Promise<void>;

  abstract consumePaymentSucceedEvent(
    onEvent: (event: OrderPaymentSucceedEvent) => void,
  ): Promise<void>;

  abstract consumeOrderCreatedEvent(
    onEvent: (event: OrderCreatedEvent) => void,
  ): Promise<void>;
}
