import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RABITMQ_QUEUES } from './rabbitmq.config';
import { Transaction } from 'src/interface';
import { TransactionService } from 'src/service';
import { ClientService } from 'src/service/client.service';

@Controller()
export class RabbitMQController {
  constructor(
    private readonly transaction: TransactionService,
    private readonly client: ClientService
  ) {}
  @MessagePattern(RABITMQ_QUEUES.CLIENT_UPDATE)
  async clientUpdate(@Payload() data) {
    await this.client.updateClient(data)
  }
  @MessagePattern(RABITMQ_QUEUES.TRANSACTION_UPDATE)
  async TransctionUpdate(@Payload() data: Transaction) {
    return await this.transaction.process(data);
  }
}
