import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  findMany() {
    return this.orderModel
      .find()
      .populate('customer')
      .populate('products')
      .exec();
  }

  async findById(id: string) {
    const order = await this.orderModel
      .findById(id)
      .populate('customer')
      .populate('products')
      .exec();

    if (!order) throw new NotFoundException(`Order with id ${id} not found`);

    return order;
  }

  create(payload: CreateOrderDto) {
    const newOrder = new this.orderModel(payload);

    return newOrder.save();
  }

  async update(id: string, payload: UpdateOrderDto) {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .populate('customer')
      .populate('products')
      .exec();

    if (!order) throw new NotFoundException(`Order with id ${id} not found`);

    return order;
  }

  async remove(id: string) {
    this.findById(id);

    return this.orderModel
      .findByIdAndDelete(id)
      .populate('customer')
      .populate('products')
      .exec();
  }
}
