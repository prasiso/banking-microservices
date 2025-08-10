import { Module } from '@nestjs/common';
import { TransactionController } from 'src/controller';
import { TransactionService } from 'src/service';
import { CacheModule } from './cache.module';

@Module({
  imports: [CacheModule],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
