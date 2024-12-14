export type Card = {
  holderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  ccv: string;
};

export type Charge = {
  id: string;
};

export type Customer = {
  id: string;
};

export abstract class PaymentService {
  abstract createCustomer(
    name: string,
    email: string,
    document: string,
  ): Promise<Customer>;
  abstract findCustomerByDocument(document: string): Promise<Customer | null>;
  abstract createCreditCardCharge(
    customerId: string,
    remoteIp: string,
    price: number,
    parcels: number,
    card: Card,
  ): Promise<Charge>;
}
