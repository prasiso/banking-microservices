import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cache_manager: Cache) { }

  async get<T>(key: string): Promise<T | undefined> {
    return await this.cache_manager.get<T>(key);
  }
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cache_manager.set(key, value, ttl);
  }
  async del(key: string): Promise<void> {
    await this.cache_manager.del(key);
  }
  async reset(): Promise<void> {
    await this.cache_manager.clear();
  }
  buildKey(namespace: string, identifier: string | number): string {
    return `${namespace}:${identifier}`
  }
}
