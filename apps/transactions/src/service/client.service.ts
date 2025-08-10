import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BodyQueueUpdateClient } from 'src/interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}
  async updateClient(data: BodyQueueUpdateClient) {
    const { email, name, banking, id_client } = data;
    const body: Prisma.clientCreateInput = {
      id_client,
      email,
      name,
      account: banking?.account,
      agency: banking?.agency,
    };
    return await this.prisma.client.upsert({
      where: {
        id_client: data.id_client,
      },
      create: { ...body, balance: 100 },
      update: body,
    });
  }
}
