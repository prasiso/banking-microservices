import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export class RabbitMQService {
  constructor(@Inject('RABBITMQ_CLIENT') private client: ClientProxy) {}
  emit<T>(key: string, data: T) {
    return this.client.emit(key, data);
  }
}
