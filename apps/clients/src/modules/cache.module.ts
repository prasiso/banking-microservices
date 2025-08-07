import { Module } from '@nestjs/common';
import { CacheService } from 'src/services';

@Module({
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
