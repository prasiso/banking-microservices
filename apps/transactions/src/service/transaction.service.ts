import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Status } from '@prisma/client';
import { CreateTransactionDto } from 'src/dto';
import { Transaction } from 'src/interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { RABITMQ_QUEUES } from 'src/queue/rabbitmq.config';
import { RabbitMQService } from 'src/queue/rabbitmq.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbit: RabbitMQService,
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
      return data
    });
  }

  async process(@Payload() data: Transaction) {
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
}
