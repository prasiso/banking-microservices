import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ClientModule } from './modules';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './config/redis';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync(RedisOptions),
    PrismaModule,
    ClientModule,
  ],
})
export class AppModule {}
