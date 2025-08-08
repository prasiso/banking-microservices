import { ClientService } from 'src/services';
import { createTestModule } from './module';
import { cacheMock, prismaMock, rabbitMQMock } from './mock';
import { ConflictException } from '@nestjs/common';

describe('ClientService - update_client', () => {
  let service: ClientService;
  beforeEach(async () => {
    const result = await createTestModule();
    service = result.service;
    jest.spyOn(service, 'get_one').mockResolvedValue({ id_client: 1 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Email enviado já está em uso', async () => {
    const body = {
      email: 'joao.silva@example.com',
    };
    prismaMock.client.count.mockResolvedValue(1);
    await expect(service.update_client(1, body)).rejects.toThrow(
      ConflictException,
    );
  });
  it('Cliente atualizando todo o corpo', async () => {
    const id_client = 1;
    const key = `user:${id_client}`;
    const banking = {
      agency: '0023',
      account: '234567-8',
    };
    const body = {
      name: 'Maria Oliveira',
      email: 'joao.silva@example.com',
      address: 'Avenida Central, 455',
    };
    const data = {
      ...body,
      banking,
    };
    const up = {
      id_client,
      ...data,
    };
    prismaMock.client.count.mockResolvedValue(0);
    prismaMock.client.update.mockResolvedValue(up);
    cacheMock.buildKey.mockReturnValue(key);
    const result = await service.update_client(1, data);
    expect(prismaMock.client.count).toHaveBeenCalledWith({
      where: {
        id_client: { not: id_client },
        email: body.email,
      },
    });
    expect(prismaMock.client.update).toHaveBeenCalledWith({
      where: { id_client },
      data: {
        ...body,
        banking: {
          update: banking,
        },
      },
      include: { banking: true },
    });

    expect(cacheMock.set).toHaveBeenCalledWith(
      `user:${id_client}`,
      up,
      60 * 1000,
    );
    expect(rabbitMQMock.emit).toHaveBeenCalled()
    expect(result).toEqual(up);
  });

  it('Cliente atualizando sem dados bancários', async () => {
    const id_client = 1;
    const data = {
      name: 'Maria Oliveira',
      email: 'joao.silva@example.com',
      address: 'Avenida Central, 455',
    };
    prismaMock.client.count.mockResolvedValue(0);
    prismaMock.client.update.mockResolvedValue({ id_client, ...data });
    cacheMock.buildKey.mockResolvedValue(`user:${id_client}`);
    const result = await service.update_client(id_client, data);
    expect(prismaMock.client.update).toHaveBeenCalledWith({
      where: { id_client },
      data,
      include: { banking: true },
    });
    expect(cacheMock.buildKey).toHaveBeenCalled();
    expect(cacheMock.set).toHaveBeenCalled();
    expect(rabbitMQMock.emit).toHaveBeenCalled()
    expect(result).toEqual({ id_client, ...data });
  });
});
