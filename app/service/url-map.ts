import { Context, Service } from 'egg';
import { IInfo } from 'interface';
import UrlMapDao from '../dao/url-map';
import UrlMapRedis from '../redis/url-map';
import UrlMapCache from './cache';
import BloomFilter from './bloom-filter';
import { encode10To62 } from '../utils';
import { NOISE_NUMBER } from '../utils/constants';

export default class UrlMapService extends Service {
  urlMapDao: UrlMapDao;
  urlMapRedis: UrlMapRedis;
  urlMapCache: UrlMapCache;
  bloomFilter: BloomFilter;

  constructor(ctx: Context) {
    super(ctx);
    this.urlMapRedis = this.app.redis.urlMap;
    this.urlMapDao = this.ctx.dao.urlMap;
    this.urlMapCache = this.ctx.service.cache;
    this.bloomFilter = this.ctx.service.bloomFilter;
  }

  async generatorID(): Promise<number> {
    const id = await this.urlMapDao.getMMaxId();
    return id + 1 + NOISE_NUMBER;
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
    await this.bloomFilter.add(info.originalUrl);
  }
}
