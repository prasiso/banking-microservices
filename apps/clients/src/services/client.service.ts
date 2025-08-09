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
import { AwsS3Service } from './aws';
@Injectable()
export class ClientService {
  private bucket: string;
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
    private readonly rabbit: RabbitMQService,
    private readonly s3: AwsS3Service,
  ) {
    this.bucket = String(process.env.AWS_S3_BUCKET_PROFILE);
  }
  async get_one(id: number, opt?: ParamsGetOne, cache = true): Promise<Client> {
    if (!Number(id))
      throw new BadRequestException('Parametro id enviado não é valido');

    const { cached, key } = await this.get_cached(id);
    if (cached) return cached;
    const data = await this.prisma.client.findFirst({
      where: { id_client: id },
      ...opt,
    });
    if (!data) throw new NotFoundException('Cliente não encontrado');
    if (cache) await this.cache.set(key, data, 60 * 1000);
    return data;
  }
  async update_client(id: number, body: updateClientDto): Promise<Client> {
    const client = await this.get_one(
      id,
      {
        select: {
          id_client: true,
          banking: {
            select: {
              account: true,
              agency: true,
            },
          },
        },
      },
      false,
    );
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
    if (banking?.account || banking?.agency) {
      const agency = banking?.agency ?? client.banking?.agency;
      const account = banking?.account ?? client.banking?.account;
      const valid = await this.prisma.banking.count({
        where: {
          agency,
          account,
          client: {
            id_client: {
              not: id,
            },
          },
        },
      });
      if (valid >= 1)
        throw new BadRequestException('A agência e a conta já estão em uso');
    }
    const data: Prisma.clientUpdateInput = rest;
    if (banking) {
      data.banking = {
        update: banking,
      };
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
    this.rabbit.emit<Client>(RABITMQ_QUEUES.CLIENT_UPDATE, response);
    return response;
  }

  async upload_file(document: any, id: number) {
    if (!document) throw new NotFoundException('Não foi enviado arquivo');
    await this.get_one(+id, { select: { id_client: true } }, false);
    const bucket = String(process.env.AWS_S3_BUCKET_PROFILE);
    const key = `${Date.now()}-${document.originalname}`;
    const path = `picture/${key}`;
    const type = document.mimetype;
    await this.prisma.$transaction(async (prisma: PrismaService) => {
      const resp = await this.s3.upload_file(
        bucket,
        path,
        document.buffer,
        type,
      );
      if (resp?.stack)
        throw new BadRequestException(
          'Não foi possível atualizar a foto de perfil, favor contactar suporte',
        );
      prisma.client.update({
        where: { id_client: id },
        data: {
          profile_picture: path,
        },
      });
    });
    const link = await this.s3.get_signed_url(this.bucket, path);
    const resp = { link };
    const { cached, key: keyCache } = await this.get_cached(id);
    if (!cached) return resp;
    cached.profile_picture = link;
    await this.cache.set(keyCache, cached, 60 * 1000);
    return resp;
  }

  async get_cached(id) {
    const key = this.cache.buildKey('user', id);
    const cached = await this.cache.get<Client>(key);
    return { cached, key };
  }
}
