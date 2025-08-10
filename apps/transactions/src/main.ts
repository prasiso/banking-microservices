import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { addSwagger } from './swagger';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './common/exception';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const queues = app.get<MicroserviceOptions[]>('RABBITMQ_MICROSERVICES');
  queues.forEach((config) => {
    app.connectMicroservice(config);
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  addSwagger(app);
  await app.startAllMicroservices();
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
