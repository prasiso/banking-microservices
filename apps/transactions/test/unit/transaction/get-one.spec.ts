import { TransactionService } from 'src/service';
import { createTestModule } from './module';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { cacheMock, prismaMock } from './mock';

describe('TransactionService - get one', () => {
  let service: TransactionService;
  beforeEach(async () => {
    const result = await createTestModule();
    service = result.service;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  // UTILIZADO IA E REVISADO TROCANDO A NOMECLATURA E AJUSTANDO OS CODIGOS
  it('Id invalido', async () => {
    await expect(service.get_one(NaN)).rejects.toThrow(BadRequestException);
    expect(prismaMock.transaction.findFirst).not.toHaveBeenCalled();
    expect(cacheMock.get).not.toHaveBeenCalled();
  });

  it('Retorno com cache', async () => {
    const mockTransaction = { id_transaction: 1, name: 'Cached transaction' };
    cacheMock.buildKey.mockReturnValue('cache-key');
    cacheMock.get.mockResolvedValue(mockTransaction);

    const result = await service.get_one(1);

    expect(result).toEqual(mockTransaction);
    expect(cacheMock.buildKey).toHaveBeenCalledWith('trans', 1);
    expect(cacheMock.get).toHaveBeenCalledWith('cache-key');
    expect(prismaMock.transaction.findFirst).not.toHaveBeenCalled();
  });

  it('Busca no banco e salva no cache', async () => {
    const mockTransaction = { id_transaction: 2, name: 'DB transaction' };
    cacheMock.buildKey.mockReturnValue('cache-key');
    cacheMock.get.mockResolvedValue(null);
    prismaMock.transaction.findFirst.mockResolvedValue(mockTransaction);

    const result = await service.get_one(
      2,
      { select: { id_transaction: true } },
      true,
    );

    expect(result).toEqual(mockTransaction);
    expect(cacheMock.buildKey).toHaveBeenCalledWith('trans', 2);
    expect(cacheMock.get).toHaveBeenCalledWith('cache-key');
    expect(prismaMock.transaction.findFirst).toHaveBeenCalledWith({
      where: { id_transaction: 2 },
      select: { id_transaction: true },
    });
    expect(cacheMock.set).toHaveBeenCalledWith(
      'cache-key',
      mockTransaction,
      60 * 1000,
    );
  });

  it('Buscar no banco e não salvar no cache', async () => {
    const mockTransaction = {
      id_transaction: 3,
      name: 'DB transaction no cache',
    };
    cacheMock.buildKey.mockReturnValue(
      `trans:${mockTransaction.id_transaction}`,
    );
    cacheMock.get.mockResolvedValue(null);
    prismaMock.transaction.findFirst.mockResolvedValue(mockTransaction);

    const result = await service.get_one(3, undefined, false);

    expect(result).toEqual(mockTransaction);
    expect(cacheMock.set).not.toHaveBeenCalled();
  });

  it('Transferencia não encontrada', async () => {
    cacheMock.buildKey.mockReturnValue(`trans:99`);
    cacheMock.get.mockResolvedValue(null);
    prismaMock.transaction.findFirst.mockResolvedValue(null);

    await expect(service.get_one(99)).rejects.toThrow(NotFoundException);

    expect(prismaMock.transaction.findFirst).toHaveBeenCalledWith({
      where: { id_transaction: 99 },
    });
    expect(cacheMock.set).not.toHaveBeenCalled();
  });
});
