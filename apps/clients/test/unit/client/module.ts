import { PrismaService } from 'src/prisma/prisma.service';
import { AwsS3Service, CacheService, ClientService } from 'src/services';
import { cacheMock, prismaMock, rabbitMQMock, s3Mock } from './mock';
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
      { provide: AwsS3Service, useValue: s3Mock },
    ],
  }).compile();

  const service = module.get<ClientService>(ClientService);
  return { module, service };
}
