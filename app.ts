import { Application } from 'egg';
import { createClient } from 'redis';
import LRVCache from './app/utils/lru-cache';

class AppBootHook {
  public app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
    await this.initRedis();
    this.initCache();
  }

  initCache() {
    // 这里可以根据需要来配置缓存的数量
    this.app.cache = LRVCache(100);
  }

  async initRedis() {
    const { redisConfig } = this.app.config;
    const client = createClient(redisConfig);
    client.on('error', (err: any) => console.log('Redis Client Error', err));
    await client.connect();
    this.app.redisClient = client;
  }
}

module.exports = AppBootHook;
