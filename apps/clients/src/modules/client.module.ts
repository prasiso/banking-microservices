import { Module } from '@nestjs/common';
import { ClientController } from 'src/controllers';
import { CacheService, ClientService } from 'src/services';

@Module({
  controllers: [ClientController],
  providers: [ClientService, CacheService]
})
export class ClientModule {}
