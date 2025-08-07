import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Client } from 'src/entities';
import { ParamsGetOne } from 'src/interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheService } from './cache.service';
@Injectable()
export class ClientService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) { }
  async getOne(id: number, opt?: ParamsGetOne): Promise<Client> {
    if (!Number(id))
      throw new BadRequestException('Parametro id enviado não é valido');

    const key = this.cache.buildKey('user', id)
    const cached = await this.cache.get<Client>(key)
    if (cached) return cached
    const data = await this.prisma.client.findFirst({
      where: { id_client: id },
      ...opt,
    });
    if (!data) throw new NotFoundException('Cliente não encontrado');
    await this.cache.set(key, data, 6000)
    return data;
  }
}
