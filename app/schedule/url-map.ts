import { Context, Subscription } from 'egg';
import UrlMapDao from '../dao/url-map';
import { UrlMapCreationAttr } from '../model/url-map';
import UrlMapRedis from '../redis/url-map';
import UrlMapCache from '../service/cache';
import { UrlMapStatueEnum } from '../utils/enum';

export default class UpdateUrlMap extends Subscription {
  urlMapDao: UrlMapDao;
  urlMapRedis: UrlMapRedis;
  urlMapCache: UrlMapCache;

  constructor(ctx: Context) {
    super(ctx);
    this.urlMapRedis = this.app.redis.urlMap;
    this.urlMapDao = this.ctx.dao.urlMap;
    this.urlMapCache = this.ctx.service.cache;
  }

  static get schedule() {
    return {
      // 每天
      interval: '24h',
      // 随机指定一个 worker 去执行定时任务
      type: 'worker',
    };
  }


  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const urlMapMDatas = await this.urlMapDao.getExpiredMDatas();
    const updateDatas = urlMapMDatas.map(item => ({
      id: item.id,
      status: UrlMapStatueEnum.Abnormal,
    })) as UrlMapCreationAttr[];
    const tinyUrls = urlMapMDatas.map(item => item.tinyUrl);
    console.log(updateDatas);
    // await this.urlMapDao.bulkCreate(updateDatas, ['id', 'status']);
    await this.urlMapRedis.del(tinyUrls);
    this.urlMapCache.del(tinyUrls);
  }
}
