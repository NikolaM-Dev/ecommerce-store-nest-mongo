import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
export const initSwagger = (app: INestApplication) => {
  const swaggeConfig = new DocumentBuilder()
    .setTitle('ECOMMERCE STORE')
    .setDescription('Simple API to manage all the services of an Ecommerce.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggeConfig);
  SwaggerModule.setup('docs', app, document);
};
