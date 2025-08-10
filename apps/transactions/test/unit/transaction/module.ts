import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionService } from 'src/service';
import { Test, TestingModule } from '@nestjs/testing';
import { prismaMock, rabbitMQMock } from './mock';
import { RabbitMQService } from 'src/queue/rabbitmq.service';

export async function createTestModule(): Promise<{
  module: TestingModule;
  service: TransactionService;
}> {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      TransactionService,
      { provide: PrismaService, useValue: prismaMock },
      { provide: RabbitMQService, useValue: rabbitMQMock },
    ],
  }).compile();

  const service = module.get<TransactionService>(TransactionService);
  return { module, service };
}
