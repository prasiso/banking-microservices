import { DynamicModule, Global, Module } from '@nestjs/common';
import { RabbitMQController } from './rabbitmq.controller';
import {
  ClientsModule,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { RabbitMQMicroserviceConfig } from './rabbitmq.interface';
import { RabbitMQService } from './rabbitmq.service';
import { RABITMQ_QUEUES, RABITMQ_URL } from './rabbitmq.config';
import { ClientModule, TransactionModule } from 'src/modules';

@Global()
@Module({
  imports: [
    ClientModule,
    TransactionModule,
    ClientsModule.register([
      {
        name: 'RABBITMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [RABITMQ_URL],
          queue: RABITMQ_QUEUES.CLIENT_UPDATE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [RabbitMQController],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {
  static register(config: RabbitMQMicroserviceConfig): DynamicModule {
    const microservices = config.queues.map((queue) => ({
      transport: Transport.RMQ,
      options: {
        urls: [config.url],
        queue,
        queueOptions: {
          durable: true,
        },
      },
    })) as MicroserviceOptions[];

    return {
      module: RabbitMQModule,
      providers: [
        {
          provide: 'RABBITMQ_MICROSERVICES',
          useValue: microservices,
        },
      ],
      exports: ['RABBITMQ_MICROSERVICES'],
    };
  }
}
