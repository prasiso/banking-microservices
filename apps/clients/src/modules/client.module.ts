import { Module } from '@nestjs/common';
import { ClientController } from 'src/controllers';
import { CacheService, ClientService } from 'src/services';
import { AwsModule } from './aws.module';

@Module({
  imports: [AwsModule],
  controllers: [ClientController],
  providers: [ClientService, CacheService]
})
export class ClientModule {}
