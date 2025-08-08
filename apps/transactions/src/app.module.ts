import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQModule } from './queue/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';
import { RABITMQ_QUEUES, RABITMQ_URL } from './queue/rabbitmq.config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    RabbitMQModule.register({
      queues: Object.values(RABITMQ_QUEUES),
      url: RABITMQ_URL,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
