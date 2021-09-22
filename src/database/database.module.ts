import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'src/config';

const API_KEY = '12345634';
const API_KEY_PROD = 'production1234';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          host,
          port,
          user: username,
          password,
          dbName: database,
          synchronize,
        } = configService.postgres;

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize,
          retryDelay: 3000,
          retryAttempts: 10,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          dbName: database,
          user,
          host,
          password,
          port,
        } = configService.postgres;

        const client = new Client({
          user,
          host,
          database,
          password,
          port,
        });
        client.connect();

        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
