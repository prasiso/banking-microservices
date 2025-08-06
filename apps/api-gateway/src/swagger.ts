import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const addSwagger = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle('Banking Microservices - Gateway')
    .setDescription('Api Centralizada')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
};
