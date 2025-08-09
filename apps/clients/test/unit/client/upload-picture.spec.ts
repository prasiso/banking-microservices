import { ClientService } from 'src/services';
import { createTestModule } from './module';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { cacheMock, prismaMock, s3Mock } from './mock';

describe('ClientService - upload', () => {
  let service: ClientService;
  beforeEach(async () => {
    const result = await createTestModule();
    service = result.service;
    jest.spyOn(service, 'get_one').mockResolvedValue({ id_client: 1 });
    jest
      .spyOn(service, 'get_cached')
      .mockResolvedValue({ cached: { id_client: 1 }, key: 'user:1' });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Caso não seja enviado arquivo', async () => {
    const buffer = null;
    await expect(service.upload_file(buffer, 1)).rejects.toThrow(
      NotFoundException,
    );
  });
  it('Enviado arquivo e não subiu para a aws', async () => {
    s3Mock.upload_file.mockResolvedValue({ stack: 'Error' });
    const buffer = Buffer.from('conteúdo do arquivo');
    await expect(service.upload_file(buffer, 1)).rejects.toThrow(
      BadRequestException,
    );
  });
  it('Enviado arquivo e atualizado com sucesso', async () => {
    s3Mock.upload_file.mockResolvedValue(undefined);
    prismaMock.client.update.mockResolvedValue({ id_client: 1 });
    s3Mock.get_signed_url.mockResolvedValue('link do arquivo');
    cacheMock.set.mockResolvedValue(undefined);
    const buffer = Buffer.from('conteúdo do arquivo');
    const result = await service.upload_file(buffer, 1)
    expect(result).toHaveProperty('link');
    expect(s3Mock.get_signed_url).toHaveBeenCalled()
  });
});
