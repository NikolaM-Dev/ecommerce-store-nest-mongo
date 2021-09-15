import { ConfigType } from '@nestjs/config';
import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config';

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
  exports: [MongooseModule],
})
export class DatabaseModule {}
