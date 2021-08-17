import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customers.dto';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomersService {
  private counterId = 0;
  private customers: Array<Customer> = [
    {
      id: 1,
      name: 'Nikola',
      lastName: 'Merchan',
      phone: '3115086701',
    },
  ];

  findAll() {
    return this.customers;
  }

  findById(id: number) {
    const customer = this.customers.find((customer) => customer.id === id);

    if (!customer)
      throw new NotFoundException(`Customer with id ${id} not found`);

    return customer;
  }

  create(payload: CreateCustomerDto) {
    const id = ++this.counterId;
    const newCustomer = { id, ...payload };
    this.customers.push(newCustomer);

    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findById(id);
    const index = this.customers.findIndex((customer) => customer.id === id);
    this.customers[index] = { ...customer, ...payload };

    return this.customers[index];
  }

  delete(id: number) {
    const customer = this.findById(id);
    this.customers = this.customers.filter((customer) => customer.id !== id);

    return customer;
  }
}
