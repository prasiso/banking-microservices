import { ClientService } from 'src/services';
import { Test, TestingModule } from '@nestjs/testing';
import { prismaMock } from './mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ParamsGetOne } from 'src/interface';
import { PrismaService } from 'src/prisma/prisma.service';
describe('ClientService - getOne', () => {
  let service: ClientService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    service = module.get<ClientService>(ClientService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('parâmetro id inválido deve responder badRequest', async () => {
    await expect(service.getOne(NaN)).rejects.toThrow(BadRequestException);
    await expect(service.getOne(0)).rejects.toThrow(BadRequestException);
  });
  it('Cliente não encontrado deve responder notFound', async () => {
    prismaMock.client.findFirst.mockResolvedValue(null);
    await expect(service.getOne(1)).rejects.toThrow(NotFoundException);
    expect(prismaMock.client.findFirst).toHaveBeenCalledWith({
      where: { id_client: 1 },
    });
  });
  it('Cliente encontrado deve responder com dados do cliente', async () => {
    const client = { id_client: 1 };
    prismaMock.client.findFirst.mockResolvedValue(client);
    const res = await service.getOne(1);
    expect(res).toEqual(client);
    expect(prismaMock.client.findFirst).toHaveBeenCalledWith({
      where: { id_client: 1 },
    });
  });
  it('Procura de cliente com as opções do findFirst', async () => {
    const client = { id_client: 1 };
    prismaMock.client.findFirst.mockResolvedValue(client);
    const opt: ParamsGetOne = {
      select: {
        id_client: true,
      },
    };
    const res = await service.getOne(1, opt);
    expect(res).toEqual(client);
    expect(prismaMock.client.findFirst).toHaveBeenCalledWith({
      where: { id_client: 1 },
      ...opt,
    });
  });
});
