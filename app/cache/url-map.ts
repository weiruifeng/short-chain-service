import { BaseContextClass, Context } from 'egg';
import { ICache } from 'interface';

export default class UrlMapRedis extends BaseContextClass {
  client: ICache;

  constructor(ctx: Context) {
    super(ctx);
    this.client = this.app.cache;
  }

  get(key: string): any | null {
    return this.client.get(key);
  }

  set(key: string, value: any): void {
    return this.client.set(key, value);
  }

  del(key: string): any | null {
    return this.client.del(key);
  }
}
