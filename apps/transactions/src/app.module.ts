import { Module } from '@nestjs/common';
import { RabbitMQModule } from './queue/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';
import { RABITMQ_QUEUES, RABITMQ_URL } from './queue/rabbitmq.config';
import { PrismaModule } from './prisma/prisma.module';
import { ClientModule, TransactionModule } from './modules';
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    TransactionModule,
    ClientModule,
    RabbitMQModule.register({
      queues: Object.values(RABITMQ_QUEUES),
      url: RABITMQ_URL,
    }),
  ],
})
export class AppModule {}
