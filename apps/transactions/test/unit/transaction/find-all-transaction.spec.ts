import { TransactionService } from 'src/service';
import { createTestModule } from './module';
import { FindAllTransactionDto } from 'src/dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { prismaMock } from './mock';

describe('TransactionService - find-all', () => {
  let service: TransactionService;
  beforeEach(async () => {
    const module = await createTestModule();
    service = module.service;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Id inválido', async () => {
    const query: FindAllTransactionDto = {
      page: 1,
      limit: 10,
    };
    const id = 0;
    await expect(service.find_all(id, query)).rejects.toThrow(
      BadRequestException,
    );
  });
  it('Caso onde se envia id_another_client igual ao id', async () => {
    const query: FindAllTransactionDto = {
      page: 1,
      limit: 10,
      id_another_client: 1,
    };
    const id = 1;
    await expect(service.find_all(id, query)).rejects.toThrow(
      BadRequestException,
    );
  });
  it('Cliente ou Outro Cliente não encontrado', async () => {
    const query: FindAllTransactionDto = {
      page: 1,
      limit: 10,
    };
    const id = 99;
    prismaMock.client.findFirst.mockResolvedValue(null);
    await expect(service.find_all(id, query)).rejects.toThrow(
      NotFoundException,
    );
  });
  it('Pesquisa de Transferência com sucesso', async () => {
    const query: FindAllTransactionDto = {
      page: 1,
      limit: 10,
    };
    const id = 1;
    prismaMock.client.findFirst.mockResolvedValue({
      id_client: 1,
    });
    prismaMock.transaction.findMany.mockResolvedValue([
      {
        id_transaction: 24,
        id_client_send: 1,
        id_client_receiver: 2,
        amount: 5,
        created_at: '2025-08-10T00:00:00.000Z',
        status: 'COMPLETED',
        updated_at: '2025-08-10T00:00:00.000Z',
        description: 'string',
      },
    ]);
    prismaMock.transaction.count.mockResolvedValue(1);
    const result = await service.find_all(id, query);
    expect(result).toHaveProperty('count', 1);
  });
});
