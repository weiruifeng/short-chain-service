import { BaseContextClass, Context } from 'egg';
import { IUrlMapCache } from 'interface';
import { RedisClientType } from 'redis';

export default class UrlMapRedis extends BaseContextClass {
  client: RedisClientType;

  constructor(ctx: Context) {
    super(ctx);
    this.client = this.app.redisClient;
  }

  async get(key: string): Promise<IUrlMapCache> {
    const redisValue = await this.client.get(key);
    return redisValue ? JSON.parse(redisValue) : null;
  }

  async set(key: string, value: IUrlMapCache) {
    const redisValue = JSON.stringify(value);
    return await this.client.set(key, redisValue);
  }

  async del(key: string) {
    return await this.client.del(key);
  }
}
