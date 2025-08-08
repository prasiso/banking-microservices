import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { addSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './common/exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  addSwagger(app);
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
