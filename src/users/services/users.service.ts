import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { ProductsService } from 'src/products/services/products.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private productsService: ProductsService,
  ) {}

  findMany() {
    return this.userModel.find().exec();
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  create(payload: CreateUserDto) {
    const newUser = new this.userModel(payload);

    return newUser.save();
  }

  async update(id: string, payload: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  async remove(id: string) {
    this.findById(id);

    return await this.userModel.findByIdAndDelete(id);
  }

  async findOrderByUserId(id: string) {
    const user = await this.findById(id);
    const { products } = await this.productsService.findMany();

    return {
      date: new Date(),
      user,
      products,
    };
  }
}
