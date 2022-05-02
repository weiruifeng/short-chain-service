import { BaseContextClass, Context } from 'egg';
import { RedisClientType } from 'redis';

export default class UrlMapRedis extends BaseContextClass {
  client: RedisClientType;

  constructor(ctx: Context) {
    super(ctx);
    this.client = this.app.redisClient;
  }

  async get(key: string): Promise<any> {
    return await this.client.get(key);
  }

  async set(key: string, value: any): Promise<any> {
    return await this.client.set(key, value);
  }

  async del(key: string): Promise<any> {
    return await this.client.del(key);
  }
}
