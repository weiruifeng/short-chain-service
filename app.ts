import { Application } from 'egg';

class AppBootHook {
  public app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
    await this.initRedis();
  }

  async initRedis() {
    // const { config: { squirrel } } = this.app;
    // try {
    //   // 链接 redis
    //   const redisStoreClient = await StoreClientFactory.buildStoreClient(squirrel);
    //   this.app.redisStoreClient = redisStoreClient;
    // } catch (e: any) {
    //   throw new Error(e);
    // }
  }
}

module.exports = AppBootHook;
