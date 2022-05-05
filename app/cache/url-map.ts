import { BaseContextClass, Context } from 'egg';
import { ICacheClient, IRefreshCache, IUrlMapCache } from 'interface';

export default class UrlMapCache extends BaseContextClass {
  client: ICacheClient;

  constructor(ctx: Context) {
    super(ctx);
    this.client = this.app.cache;
  }

  refreshAction(data: IRefreshCache) {
    const key = this.app.config.cacheProcessKey;
    // 向多进程发送消息
    this.app.messenger.sendToApp(key, data);
  }

  async update(data: IRefreshCache) {
    switch (data.type) {
      case 'GET': {
        this.client.get(data.key);
        break;
      }
      case 'SET': {
        if (data.value) {
          this.client.set(data.key, data.value);
        }
        break;
      }
      case 'DEL': {
        this.client.del(data.key);
        break;
      }
      default:
        break;
    }
  }

  get(key: string): IUrlMapCache | null {
    const value = this.client.get(key) as IUrlMapCache | null;
    if (value) {
      this.refreshAction({
        pid: process.pid,
        type: 'GET',
        key,
      });
    }
    return this.client.get(key) as IUrlMapCache | null;
  }

  set(key: string, value: IUrlMapCache): void {
    this.refreshAction({
      pid: process.pid,
      type: 'SET',
      key,
      value,
    });
    return this.client.set(key, value);
  }

  del(key: string): IUrlMapCache | null {
    const value = this.client.del(key) as IUrlMapCache | null;
    if (value) {
      this.refreshAction({
        pid: process.pid,
        type: 'DEL',
        key,
      });
    }
    return value;
  }
}
