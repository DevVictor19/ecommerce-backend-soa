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
  abstract emitPaymentFailedEvent(
    event: OrderPaymentFailedEvent,
  ): Promise<void>;

  abstract emitPaymentSucceedEvent(
    event: OrderPaymentSucceedEvent,
  ): Promise<void>;
}
