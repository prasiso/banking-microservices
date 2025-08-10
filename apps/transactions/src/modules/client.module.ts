import { Module } from '@nestjs/common';
import { ClientService } from 'src/service';

@Module({
  providers: [ClientService],
  exports: [ClientService]
})
export class ClientModule {}
