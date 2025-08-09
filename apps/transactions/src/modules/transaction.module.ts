import { Module } from '@nestjs/common';
import { TransactionController } from 'src/controller';
import { TransactionService } from 'src/service';

@Module({
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
