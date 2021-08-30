import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  findMany() {
    return this.customerModel.find().exec();
  }

  async findById(id: string) {
    const customer = await this.customerModel.findById(id);

    if (!customer)
      throw new NotFoundException(`Customer with id ${id} not found`);

    return customer;
  }

  // create(payload: CreateCustomerDto) {
  //   const id = ++this.counterId;
  //   const newCustomer = { id, ...payload };
  //   this.customers.push(newCustomer);

  //   return newCustomer;
  // }

  // update(id: number, payload: UpdateCustomerDto) {
  //   const customer = this.findById(id);
  //   const index = this.customers.findIndex((customer) => customer.id === id);
  //   this.customers[index] = { ...customer, ...payload };

  //   return this.customers[index];
  // }

  // delete(id: number) {
  //   const customer = this.findById(id);
  //   this.customers = this.customers.filter((customer) => customer.id !== id);

  //   return customer;
  // }
}
