import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    name: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
  },
  mongo: {
    dbName: process.env.MONGO_DB,
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    host: process.env.MONGO_HOST,
    connection: process.env.MONGO_CONNECTION,
  },
  apiKey: process.env.API_KEY,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
}));
