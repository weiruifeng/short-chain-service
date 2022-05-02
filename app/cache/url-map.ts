import { BaseContextClass, Context } from 'egg';
import { ICacheClient, IUrlMapCache } from 'interface';

export default class UrlMapCache extends BaseContextClass {
  client: ICacheClient;

  constructor(ctx: Context) {
    super(ctx);
    this.client = this.app.cache;
  }

  get(key: string): IUrlMapCache | null {
    return this.client.get(key) as IUrlMapCache | null;
  }

  set(key: string, value: IUrlMapCache): void {
    return this.client.set(key, value);
  }

  del(key: string): IUrlMapCache | null {
    return this.client.del(key) as IUrlMapCache | null;
  }
}
