import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Client } from 'src/entities';
import { ParamsGetOne } from 'src/interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheService } from './cache.service';
import { updateClientDto } from 'src/dtos';
import { Prisma } from '@prisma/client';
import { RabbitMQService } from 'src/queue/rabbitmq.service';
import { RABITMQ_QUEUES } from 'src/queue/rabbitmq.config';
@Injectable()
export class ClientService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
    private readonly rabbit: RabbitMQService
  ) { }
  async get_one(id: number, opt?: ParamsGetOne): Promise<Client> {
    if (!Number(id))
      throw new BadRequestException('Parametro id enviado não é valido');

    const key = this.cache.buildKey('user', id);
    const cached = await this.cache.get<Client>(key);
    if (cached) return cached;
    const data = await this.prisma.client.findFirst({
      where: { id_client: id },
      ...opt,
    });
    if (!data) throw new NotFoundException('Cliente não encontrado');
    await this.cache.set(key, data, 60 * 1000);
    return data;
  }
  async update_client(id: number, body: updateClientDto): Promise<Client> {
    await this.get_one(id, { select: { id_client: true } });
    if (body.email) {
      const email_found_another_client = await this.prisma.client.count({
        where: {
          id_client: {
            not: id,
          },
          email: body.email,
        },
      });
      if (email_found_another_client)
        throw new ConflictException('Este e-mail já está em uso.');
    }
    const { banking, ...rest } = body;
    const data: Prisma.clientUpdateInput = rest;
    if (banking) {
      data.banking = {
        update: banking,
      }
    }
    const response = await this.prisma.client.update({
      where: {
        id_client: id,
      },
      data,
      include: {
        banking: true,
      },
    });
    const key = this.cache.buildKey('user', id);
    await this.cache.set(key, response, 60 * 1000);
    this.rabbit.emit<Client>(RABITMQ_QUEUES.CLIENT_UPDATE, response)
    return response;
  }
}
