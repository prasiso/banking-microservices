import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AwsModule, ClientModule } from './modules';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './config/redis';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from './queue/rabbitmq.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync(RedisOptions),
    PrismaModule,
    ClientModule,
    AwsModule,
    RabbitMQModule
  ],
})
export class AppModule {}
