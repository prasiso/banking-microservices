import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { createProxy } from './helpers/create-proxy';
import { setupUnifiedSwagger } from './helpers/swagger-merge';
import { CustomExceptionFilter, LoggingInterceptor } from './common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor())
  // RETIREI DEVIDO AO USO DO INTERCEPTOR
  // app.use(
  //   '/transaction',
  //   createProxy(String(process.env.MICRO_TRANSACTION) + 'transaction/'),
  // );
  // app.use('/client', createProxy(String(process.env.MICRO_CLIENT) + 'client/'));
  await setupUnifiedSwagger(app, [
    {
      name: 'Transaction Service',
      url: String(process.env.MICRO_TRANSACTION) + '/docs-json',
    },
    {
      name: 'Clients Service',
      url: String(process.env.MICRO_CLIENT) + '/docs-json',
    },
  ]);
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
