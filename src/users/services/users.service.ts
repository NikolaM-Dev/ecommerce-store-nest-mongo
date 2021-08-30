import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { Order } from '../entities/order.entity';
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

    if (!user)
      throw new NotFoundException(`User with id ${id} not found in database`);

    return user;
  }

  // create(payload: CreateUserDto) {
  //   const id = ++this.counterId;
  //   const newUser = { id, ...payload };
  //   this.users.push(newUser);

  //   return newUser;
  // }

  // update(id: number, payload: UpdateUserDto) {
  //   const user = this.findById(id);
  //   const index = this.users.findIndex((user) => user.id === id);
  //   this.users[index] = { ...user, ...payload };

  //   return this.users[index];
  // }

  // delete(id: number) {
  //   const user = this.findById(id);
  //   this.users = this.users.filter((user) => user.id !== id);

  //   return user;
  // }

  async findOrderByUser(id: string): Promise<Order> {
    const user = await this.findById(id);
    const { products } = await this.productsService.findMany();

    return {
      date: new Date(),
      user,
      products,
    };
  }
}
