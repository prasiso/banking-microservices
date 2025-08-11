import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import {
  ClientProxyController,
  TransactionProxyController,
} from 'src/controller';
import { ProxyService } from 'src/service/proxy.service';

@Module({
  imports: [HttpModule],
  providers: [ProxyService],
  controllers: [TransactionProxyController, ClientProxyController],
})
export class ProxyModule {}
