import { DynamicModule, Global, Module } from '@nestjs/common';
import { RabbitMQController } from './rabbitmq.controller';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitMQMicroserviceConfig } from './rabbitmq.interface';

@Global()
@Module({
  controllers: [RabbitMQController],
})
export class RabbitMQModule {
  static register(config: RabbitMQMicroserviceConfig): DynamicModule {
    const microservices = config.queues.map((queue) => ({
      transport: Transport.RMQ,
      options: {
        urls: [config.url],
        queue,
        noAck: false,
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
