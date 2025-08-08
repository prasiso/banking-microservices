import { PrismaService } from 'src/prisma/prisma.service';
import { CacheService, ClientService } from 'src/services';
import { cacheMock, prismaMock, rabbitMQMock } from './mock';
import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMQService } from 'src/queue/rabbitmq.service';

export async function createTestModule(): Promise<{
  module: TestingModule;
  service: ClientService;
}> {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ClientService,
      { provide: PrismaService, useValue: prismaMock },
      { provide: CacheService, useValue: cacheMock },
      { provide: RabbitMQService, useValue: rabbitMQMock },
    ],
  }).compile();

  const service = module.get<ClientService>(ClientService);
  return { module, service };
}
