import { Body, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { optTransactionGetOne } from 'src/config';
import { CreateTransaction } from 'src/decorator/transaction';
import { getTransaction } from 'src/decorator/transaction/get-transaction';
import { CreateTransactionDto } from 'src/dto/create-transaction.dto';
import { TransactionService } from 'src/service/transaction.service';
@Controller('transaction')
@ApiTags('Transações')
export class TransactionController {
  constructor(private readonly transaction: TransactionService) {}
  @CreateTransaction()
  async create(@Body() body: CreateTransactionDto) {
    return await this.transaction.create(body);
  }
  @getTransaction()
  async getOne(@Param('id') id: string) {
    return await this.transaction.get_one(+id, optTransactionGetOne);
  }
}
