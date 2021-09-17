import { Client } from 'pg';
import { Module, Global } from '@nestjs/common';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';

const API_KEY = '12345634';
const API_KEY_PROD = 'production1234';

@Global()
@Module({
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
