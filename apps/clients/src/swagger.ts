import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const addSwagger = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle('Banking Microservices - Clientes')
    .setDescription('Micro Serviço responsavél pela parte de cliente')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
};
