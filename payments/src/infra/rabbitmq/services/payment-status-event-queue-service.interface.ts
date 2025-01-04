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
  abstract emitPaymentFailedEvent(event: PaymentFailedEvent): Promise<void>;
  abstract emitPaymentMadeEvent(event: PaymentMadeEvent): Promise<void>;
}
