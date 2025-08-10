import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Prisma, Status } from '@prisma/client';
import { CreateTransactionDto, FindAllTransactionDto } from 'src/dto';
import { FindAllTransaction, ParamsGetOne, Transaction } from 'src/interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { RABITMQ_QUEUES } from 'src/queue/rabbitmq.config';
import { RabbitMQService } from 'src/queue/rabbitmq.service';
import { CacheService } from './cache.service';
import {
  pagination_helper,
  pagination_prisma,
  transaction_filter,
} from 'src/common/helper';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbit: RabbitMQService,
    private readonly cache: CacheService,
  ) {}
  async create(body: CreateTransactionDto) {
    const clients = await this.prisma.client.findMany({
      where: {
        id_client: {
          in: [body.id_client_receiver, body.id_client_send],
        },
      },
    });
    const receiver = clients.find(
      (client) => client.id_client === body.id_client_receiver,
    );
    const send = clients.find(
      (client) => client.id_client === body.id_client_send,
    );
    if (!receiver)
      throw new NotFoundException('Não foi encontrado destinatário');
    if (!send) throw new NotFoundException('Não foi encontrado remetente');

    if (receiver.id_client === send.id_client)
      throw new BadRequestException(
        'Remetente e destinatário devem ser diferentes.',
      );
    return await this.prisma.$transaction(async (tx: PrismaService) => {
      const data = await tx.transaction.create({
        data: body,
      });
      this.rabbit.emit(RABITMQ_QUEUES.TRANSACTION_UPDATE, data);
      return data;
    });
  }

  async get_one(
    id: number,
    opt?: ParamsGetOne,
    cache = true,
  ): Promise<Transaction> {
    if (!Number(id))
      throw new BadRequestException('Parametro id enviado não é valido');

    const { cached, key } = await this.get_cached(id);
    if (cached) return cached;
    const data = await this.prisma.transaction.findFirst({
      where: { id_transaction: id },
      ...opt,
    });
    if (!data) throw new NotFoundException('Transferência não encontrado');
    if (cache) await this.cache.set(key, data, 60 * 1000);
    return data;
  }

  async get_cached(id) {
    const key = this.cache.buildKey('trans', id);
    const cached = await this.cache.get<Transaction>(key);
    return { cached, key };
  }

  async process(data: Transaction) {
    const clients = await this.prisma.client.findMany({
      where: {
        id_client: {
          in: [data.id_client_receiver, data.id_client_send],
        },
      },
    });
    const sender = clients.find(
      (client) => client.id_client === data.id_client_send,
    );
    const receiver = clients.find(
      (client) => client.id_client === data.id_client_receiver,
    );
    if (Number(sender?.balance) < data.amount) {
      return await this.prisma.transaction.update({
        where: {
          id_transaction: data.id_transaction,
        },
        data: {
          status: Status.NO_BALANCE,
          updated_at: new Date(),
        },
      });
    }
    sender!.balance = Number(sender?.balance) - Number(data.amount);
    receiver!.balance = Number(receiver!.balance) + Number(data.amount);
    const update_balance = (id: number, balance: number, tx: PrismaService) => {
      return tx.client.update({
        where: {
          id_client: id,
        },
        data: {
          balance,
          updated_at: new Date(),
        },
      });
    };
    await this.prisma.$transaction([
      update_balance(
        Number(sender?.id_client),
        Number(sender?.balance),
        this.prisma,
      ),
      update_balance(
        Number(receiver?.id_client),
        Number(receiver?.balance),
        this.prisma,
      ),
      this.prisma.transaction.update({
        where: {
          id_transaction: data.id_transaction,
        },
        data: {
          status: Status.COMPLETED,
        },
      }),
    ]);
  }

  async find_all(id: number, query: FindAllTransactionDto) {
    if (!id) throw new BadRequestException('Parametro id enviado não é valido');
    if (query.id_another_client && id === query.id_another_client)
      throw new BadRequestException(
        'O ID de pesquisa de outro cliente não pode ser igual ao ID do próprio cliente.',
      );
    const search_client = (id_client: number) => {
      return this.prisma.client.findFirst({
        where: {
          id_client,
        },
      });
    };
    const request = [search_client(id)];
    if (query.id_another_client) {
      request.push(search_client(query.id_another_client));
    }
    const [client, another_client] = await Promise.all(request);
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }
    if (!another_client && query.id_another_client) {
      throw new NotFoundException('Outro cliente não encontrado');
    }

    const where_array = transaction_filter(query);
    const client_where = (id, send = true, receiver = true) => {
      const resp: any = {
        OR: [],
      };
      if (send) resp.OR.push({ id_client_send: id });
      if (receiver) resp.OR.push({ id_client_receiver: id });
      return resp;
    };

    if (another_client) {
      where_array.push(client_where(query.id_another_client));
    }
    const clientWhere: Prisma.transactionWhereInput = client_where(
      id,
      !query.type || query.type === 'SEND',
      !query.type || query.type === 'RECEIVER',
    );

    const where: Prisma.transactionWhereInput = {
      AND: [clientWhere],
    };
    if (where_array.length && Array.isArray(where.AND)) {
      where.AND.push({ [query.operational || 'OR']: where_array });
    }
    const page = +query.page;
    const limit = +query.limit;
    const orderBy: Prisma.transactionOrderByWithRelationInput =
      query?.order ?? {
        updated_at: 'desc',
      };
    const [data, count] = await Promise.all([
      this.prisma.transaction.findMany({
        where,
        orderBy,
        ...pagination_prisma(limit, page),
      }),
      this.prisma.transaction.count({
        where,
        orderBy,
      }),
    ]);
    data.forEach((dt: FindAllTransaction) => {
      dt.type = id === dt.id_client_receiver ? 'RECEIVER' : 'SEND';
    });
    return pagination_helper(page, limit, count, data);
  }
}
