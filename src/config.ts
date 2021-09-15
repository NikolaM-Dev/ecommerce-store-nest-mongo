import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    name: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
  },
  mongo: {
    uri: process.env.MONGO_URI,
  },
  apiKey: process.env.API_KEY,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
}));
