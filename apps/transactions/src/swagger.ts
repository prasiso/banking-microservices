import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../package.json';
import { INestApplication } from '@nestjs/common';

export const addSwagger = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle('Banking Microservices - Transaction')
    .setDescription('Micro Serviço responsavél pela parte de transação')
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
};
