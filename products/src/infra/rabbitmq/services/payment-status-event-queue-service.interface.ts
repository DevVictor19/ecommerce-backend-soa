export type EventProduct = { id: string; inCartQuantity: number };

export type PaymentFailedEvent = {
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

export type PaymentMadeEvent = {
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

export abstract class PaymentStatusEventQueueService {
  abstract consumePaymentFailedEvent(
    onEvent: (event: PaymentFailedEvent) => void,
  ): Promise<void>;

  abstract consumePaymentMadeEvent(
    onEvent: (event: PaymentMadeEvent) => void,
  ): Promise<void>;
}
