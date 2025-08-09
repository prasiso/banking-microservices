import { CacheService, ClientService } from 'src/services';
import { prismaMock } from './mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ParamsGetOne } from 'src/interface';
import { createTestModule } from './module';
describe('ClientService - getOne', () => {
  let service: ClientService;
  beforeEach(async () => {
    const result = await createTestModule();
    service = result.service;
    jest
      .spyOn(service, 'get_cached')
      .mockResolvedValue({ cached: { id_client: 1 }, key: 'user:1' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('parâmetro id inválido deve responder badRequest', async () => {
    await expect(service.get_one(NaN)).rejects.toThrow(BadRequestException);
    await expect(service.get_one(0)).rejects.toThrow(BadRequestException);
  });
  it('Cliente não encontrado deve responder notFound', async () => {
    prismaMock.client.findFirst.mockResolvedValue(null);
    jest
      .spyOn(service, 'get_cached')
      .mockResolvedValue({ cached: undefined, key: 'user:1' });
    await expect(service.get_one(1)).rejects.toThrow(NotFoundException);
    expect(prismaMock.client.findFirst).toHaveBeenCalledWith({
      where: { id_client: 1 },
    });
  });
  it('Cliente encontrado deve responder com dados do cliente', async () => {
    const client = { id_client: 1 };
    jest
      .spyOn(service, 'get_cached')
      .mockResolvedValue({ cached: undefined, key: 'user:1' });
    prismaMock.client.findFirst.mockResolvedValue(client);
    const res = await service.get_one(1);
    expect(res).toEqual(client);
    expect(prismaMock.client.findFirst).toHaveBeenCalledWith({
      where: { id_client: 1 },
    });
  });
  it('Procura de cliente com as opções do findFirst', async () => {
    jest
      .spyOn(service, 'get_cached')
      .mockResolvedValue({ cached: undefined, key: 'user:1' });
    const client = { id_client: 1 };
    prismaMock.client.findFirst.mockResolvedValue(client);
    const opt: ParamsGetOne = {
      select: {
        id_client: true,
      },
    };
    const res = await service.get_one(1, opt);
    expect(res).toEqual(client);
    expect(prismaMock.client.findFirst).toHaveBeenCalledWith({
      where: { id_client: 1 },
      ...opt,
    });
  });
});
