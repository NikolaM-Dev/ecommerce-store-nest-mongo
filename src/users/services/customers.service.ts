import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
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

  create(payload: CreateCustomerDto) {
    const newCustomer = new this.customerModel(payload);

    return newCustomer.save();
  }

  async update(id: string, payload: UpdateCustomerDto) {
    const customer = await this.customerModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();

    if (!customer)
      throw new NotFoundException(
        `Customer with id ${id} not found in database`,
      );

    return customer;
  }

  async remove(id: string) {
    this.findById(id);

    return await this.customerModel.findByIdAndDelete(id);
  }
}
