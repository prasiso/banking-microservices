import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RABITMQ_QUEUES } from './rabbitmq.config';

@Controller()
export class RabbitMQController {
  constructor() {}
  @MessagePattern(RABITMQ_QUEUES.CLIENT_UPDATE)
  clientUpdate(@Payload() data) {
    console.log(data);
  }
}
