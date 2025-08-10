import { TransactionService } from 'src/service';
import { createTestModule } from './module';
import { prismaMock, rabbitMQMock } from './mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('TransactionService - create', () => {
  let service: TransactionService;
  beforeEach(async () => {
    const result = await createTestModule();
    service = result.service;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Não foi encontrado destinatário', async () => {
    const body = {
      id_client_send: 1,
      id_client_receiver: 2,
      amount: 5,
      description: 'Teste',
    };
    prismaMock.client.findMany.mockResolvedValue([{ id_client: 1 }]);
    await expect(service.create(body)).rejects.toThrow(NotFoundException);
  });
  it('Não foi encontrado remetente', async () => {
    const body = {
      id_client_send: 1,
      id_client_receiver: 2,
      amount: 5,
      description: 'Teste',
    };
    prismaMock.client.findMany.mockResolvedValue([{ id_client: 2 }]);
    await expect(service.create(body)).rejects.toThrow(NotFoundException);
  });
  it('Remetente igual ao Destinatario', async () => {
    const body = {
      id_client_send: 1,
      id_client_receiver: 1,
      amount: 5,
      description: 'Teste',
    };
    prismaMock.client.findMany.mockResolvedValue([
      { id_client: 1 },
      { id_client: 1 },
    ]);
    await expect(service.create(body)).rejects.toThrow(BadRequestException);
  });
  it('Sucesso na criação de transferência', async () => {
    const body = {
      id_client_send: 1,
      id_client_receiver: 2,
      amount: 5,
      description: 'Teste',
    };
    prismaMock.client.findMany.mockResolvedValue([
      { id_client: 1 },
      { id_client: 2 },
    ]);
    prismaMock.transaction.create.mockResolvedValue({
      id_transaction: 20,
      id_client_send: 1,
      id_client_receiver: 2,
      status: 'PENDING',
      amount: 5,
      description: 'string',
      created_at: '2025-08-10T00:00:00.000Z',
      updated_at: '2025-08-10T00:00:00.000Z',
    });
    await service.create(body);
    expect(prismaMock.transaction.create).toHaveBeenCalled();
    expect(rabbitMQMock.emit).toHaveBeenCalled();
  });
});
