export type PaymentsQueueMessage = {
  user: {
    id: string;
    name: string;
    email: string;
    remoteIp: string;
  };
  order: {
    id: string;
    price: number;
    products: { id: string; inCartQuantity: number }[];
  };
  payment: {
    document: string;
    method: string;
    parcels: number;
    card: {
      number: string;
      expiryMonth: string;
      holderName: string;
      expiryYear: string;
      ccv: string;
    };
  };
};

export abstract class PaymentsQueueService {
  abstract consume(
    onMessage: (msg: PaymentsQueueMessage) => void,
  ): Promise<void>;
}
