import { HttpService, HttpModule } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

const API_KEY = '12345634';
const API_KEY_PROD = 'production1234';

@Module({
  imports: [HttpModule, ProductsModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http.get(
          'https://jsonplaceholder.typicode.com/todos',
        );
        const { data } = await lastValueFrom(tasks);
        return data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
