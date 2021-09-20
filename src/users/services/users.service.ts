import { ConfigService } from '@nestjs/config';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  private counterId = 0;
  private users: Array<User> = [
    {
      id: 1,
      email: 'nikola@gmail.com',
      password: '123456',
      role: 'ADMIN',
    },
  ];

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);

    return this.users;
  }

  findById(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user)
      throw new NotFoundException(`User with id ${id} not found in database`);

    return user;
  }

  create(payload: CreateUserDto) {
    const id = ++this.counterId;
    const newUser = { id, ...payload };
    this.users.push(newUser);

    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findById(id);
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = { ...user, ...payload };

    return this.users[index];
  }

  delete(id: number) {
    const user = this.findById(id);
    this.users = this.users.filter((user) => user.id !== id);

    return user;
  }

  async findOrderByUser(id: number) {
    const user = this.findById(id);

    return {
      date: new Date(),
      user,
      products: await this.productsService.findMany(),
    };
  }
}
