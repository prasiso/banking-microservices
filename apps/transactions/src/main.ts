import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { addSwagger } from './swagger';
import { MicroserviceOptions } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const queues = app.get<MicroserviceOptions[]>('RABBITMQ_MICROSERVICES');
  queues.forEach((config) => {
    app.connectMicroservice(config);
  });
  addSwagger(app);
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
