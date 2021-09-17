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
        } = configService.postgres;

        return {
          host,
          port,
          username,
          password,
          database,
          entities: [],
          synchronize: true,
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
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
