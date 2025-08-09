import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTransaction } from 'src/decorator/transaction';
import { CreateTransactionDto } from 'src/dto/create-transaction.dto';
import { TransactionService } from 'src/service/transaction.service';
@Controller('transaction')
@ApiTags('transaction')
export class TransactionController {
  constructor(private readonly transaction: TransactionService) {}
  @CreateTransaction()
  async create(@Body() body: CreateTransactionDto) {
    return await this.transaction.create(body);
  }
}
