import { Application } from 'egg';
import { IRefreshCache } from 'interface';
import { createClient } from 'redis';
import LRVCache from './app/utils/lru-cache';

export default class AppBootHook {
  public app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  async didReady() {
    await this.initRedis();
    this.initCache();
  }

  initCache() {
    // TODO 这里可以根据需要来配置缓存的数量
    this.app.cache = LRVCache(100);
    const key = this.app.config.cacheProcessKey;
    // 多进程通信
    this.app.messenger.on(key, (data: IRefreshCache) => {
      if (process.pid !== data.pid) {
        const ctx = this.app.createAnonymousContext();
        ctx.runInBackground(async () => {
          await ctx.cache.urlMap.update(data);
        });
      }
    });
  }

  async initRedis() {
    const { redisConfig } = this.app.config;
    const client = createClient(redisConfig);
    client.on('error', (err: any) => console.log('Redis Client Error', err));
    await client.connect();
    this.app.redisClient = client;
  }
}
