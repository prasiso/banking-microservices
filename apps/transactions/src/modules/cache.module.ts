import { Module } from '@nestjs/common';
import { CacheService } from 'src/service';

@Module({
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
