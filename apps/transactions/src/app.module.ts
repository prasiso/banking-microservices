import { Module } from '@nestjs/common';
import { RabbitMQModule } from './queue/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';
import { RABITMQ_QUEUES, RABITMQ_URL } from './queue/rabbitmq.config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule, ClientModule, TransactionModule } from './modules';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './config/redis';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    CacheModule.registerAsync(RedisOptions),
    TransactionModule,
    ClientModule,
    RabbitMQModule.register({
      queues: Object.values(RABITMQ_QUEUES),
      url: RABITMQ_URL,
    }),
  ],
})
export class AppModule {}
