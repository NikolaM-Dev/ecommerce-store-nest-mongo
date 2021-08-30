import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { ProductsModule } from 'src/products/products.module';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    ProductsModule,
  ],
  controllers: [CustomersController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
