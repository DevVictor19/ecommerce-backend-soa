import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';

import {
  Card,
  Charge,
  Customer,
  PaymentService,
} from '../payment-service.interface';

@Injectable()
export class PaymentServiceImpl implements PaymentService {
  private readonly logger: Logger = new Logger(PaymentService.name);

  constructor(private readonly httpService: HttpService) {}

  async createCustomer(
    name: string,
    email: string,
    document: string,
  ): Promise<Customer> {
    const body = { cpfCnpj: document, email, name };

    const { data } = await this.httpService.axiosRef.post('/customers', body);

    this.logger.log(
      `Created customer for name: ${name}, document: ${document}`,
    );

    return {
      id: data.id,
    };
  }

  async findCustomerByDocument(document: string): Promise<Customer | null> {
    const { data } = await this.httpService.axiosRef.get('/customers', {
      params: new URLSearchParams({ cpfCnpj: document }),
    });

    if (data.length > 0) {
      this.logger.log(`Found customer for document: ${document}`);
    } else {
      this.logger.log(`Not found customer for document: ${document}`);
    }

    return data[0];
  }

  async createCreditCardCharge(
    customerId: string,
    remoteIp: string,
    price: number,
    parcels: number,
    card: Card,
  ): Promise<Charge> {
    const totalPrice = price / 100; // the price come in cents
    const installmentValue = this.formatNumberPrecision(totalPrice / parcels);
    const dueDate = this.getDueDate();

    const body = {
      billingType: 'CREDIT_CARD',
      card,
      customer: customerId,
      dueDate,
      installmentCount: parcels,
      installmentValue,
      remoteIp,
      value: totalPrice,
    };

    const { data } = await this.httpService.axiosRef.post('/payments', body);

    this.logger.log(`Credit card charge created for customerId: ${customerId}`);

    return {
      id: data.id,
    };
  }

  private getDueDate(): string {
    const today = new Date();
    const offset = today.getTimezoneOffset(); // remove timezone offset
    const dateWithoutTz = new Date(today.getTime() - offset * 60 * 1000);
    const nextMonth = new Date(
      dateWithoutTz.getFullYear(),
      dateWithoutTz.getMonth() + 1,
      dateWithoutTz.getDate(),
    );

    return nextMonth.toISOString().split('T')[0];
  }

  private formatNumberPrecision(value: number): number {
    return Number(value.toFixed(2));
  }
}
