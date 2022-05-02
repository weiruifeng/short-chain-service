import { Context, Service } from 'egg';
import { IInfo } from 'interface';
import UrlMapDao from '../dao/url-map';
import UrlMapRedis from '../redis/url-map';
import UrlMapCache from '../cache/url-map';
import { encode10To62 } from '../utils';
import { NOISE_NUMBER } from '../utils/constants';

export default class UrlMapService extends Service {
  urlMapDao: UrlMapDao;
  urlMapRedis: UrlMapRedis;
  urlMapCache: UrlMapCache;

  constructor(ctx: Context) {
    super(ctx);
    this.urlMapDao = this.ctx.dao.urlMap;
    this.urlMapRedis = this.ctx.redis.urlMap;
    this.urlMapCache = this.ctx.cache.urlMap;
  }

  async generatorID(): Promise<number> {
    const count = await this.urlMapDao.getMCount();
    return count + 1 + NOISE_NUMBER;
  }

  async generatorTinyUrl(): Promise<string> {
    const id = await this.generatorID();
    return encode10To62(id);
  }

  async getOriginalUrl(tinyUrl: string): Promise<string> {
    const cache = this.urlMapCache.get(tinyUrl);
    if (cache) {
      return cache.originalUrl;
    }
    const redis = await this.urlMapRedis.get(tinyUrl);
    if (redis) {
      this.urlMapCache.set(tinyUrl, redis);
      return redis.originalUrl;
    }
    const urlMapMData = await this.urlMapDao.getOneMData({ tinyUrl });
    if (urlMapMData) {
      this.urlMapCache.set(tinyUrl, {
        id: urlMapMData.id,
        tinyUrl: urlMapMData.tinyUrl,
        originalUrl: urlMapMData.originalUrl,
      });
      return urlMapMData.originalUrl;
    }
    return '';
  }

  async setInfo(info: IInfo) {
    const urlMapMData = await this.urlMapDao.create(info);
    this.urlMapRedis.set(urlMapMData.tinyUrl, {
      id: urlMapMData.id,
      tinyUrl: urlMapMData.tinyUrl,
      originalUrl: urlMapMData.originalUrl,
    });
  }
}
