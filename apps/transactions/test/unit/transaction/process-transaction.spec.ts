import { TransactionService } from 'src/service';
import { createTestModule } from './module';
import { prismaMock } from './mock';
import { Status } from '@prisma/client';
import { Transaction } from 'src/interface';

describe('TransactionService - process', () => {
  let service: TransactionService;
  beforeEach(async () => {
    const result = await createTestModule();
    service = result.service;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Saldo Insuficiente', async () => {
    const body: Transaction = {
      id_transaction: 20,
      id_client_send: 1,
      id_client_receiver: 2,
      status: Status.PENDING,
      amount: 5,
      description: 'string',
      created_at: new Date('2025-08-10T00:00:00.000Z'),
      updated_at: new Date('2025-08-10T00:00:00.000Z'),
    };
    prismaMock.client.findMany.mockResolvedValue([
      { id_client: 1, balance: 4 },
      { id_client: 2 },
    ]);
    prismaMock.transaction.update.mockResolvedValue({
      id_transaction: 20,
      id_client_send: 1,
      id_client_receiver: 2,
      status: Status.NO_BALANCE,
      amount: 5,
    });
    const result = await service.process(body);
    expect(result).toHaveProperty('status', Status.NO_BALANCE);
  });
  it('Operação concluída', async () => {
    const body: Transaction = {
      id_transaction: 20,
      id_client_send: 1,
      id_client_receiver: 2,
      status: Status.PENDING,
      amount: 5,
      description: 'string',
      created_at: new Date('2025-08-10T00:00:00.000Z'),
      updated_at: new Date('2025-08-10T00:00:00.000Z'),
    };
    prismaMock.client.findMany.mockResolvedValue([
      { id_client: 1, balance: 100 },
      { id_client: 2 },
    ]);
    prismaMock.transaction.update.mockResolvedValue({
      ...body,
      status: Status.COMPLETED,
    });
    await service.process(body);
    expect(prismaMock.client.update).toHaveBeenCalledTimes(2);
    expect(prismaMock.transaction.update).toHaveBeenCalledTimes(1);
    expect(prismaMock.transaction.update).toHaveBeenCalledWith({
      where: {
        id_transaction: body.id_transaction,
      },
      data: {
        status: Status.COMPLETED,
      },
    });
  });
});
