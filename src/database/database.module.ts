import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config';

const API_KEY = '12345634';
const API_KEY_PROD = 'production1234';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, dbName, password, host } =
          configService.mongo;

        return {
          uri: `${connection}://${host}`,
          user,
          pass: password,
          dbName,
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
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
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, dbName, password, host } =
          configService.mongo;

        const URI = `${connection}://${user}:${password}@${host}/?authSource=admin&readPreference=primary`;
        const client = new MongoClient(URI);
        await client.connect();
        const database = client.db(dbName);

        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
