import { Context, Service } from 'egg';
import { IInfo } from 'interface';
import TinyUrlDao from '../dao/tiny-url';
import { encode10To62 } from '../utils';
import { NOISE_NUMBER } from '../utils/constants';

export default class TinyUrlService extends Service {
  tinyUrlDao: TinyUrlDao;

  constructor(ctx: Context) {
    super(ctx);
    this.tinyUrlDao = this.ctx.dao.tinyUrl;
  }

  async generatorID(): Promise<number> {
    const count = await this.tinyUrlDao.getMCount();
    return count + 1 + NOISE_NUMBER;
  }

  async generatorTinyUrl(): Promise<string> {
    const id = await this.generatorID();
    return encode10To62(id);
  }

  async getOriginalUrl(tinyUrl: string): Promise<string> {
    const tinyUrlMData = await this.tinyUrlDao.getOneMData({ tinyUrl });
    return tinyUrlMData ? tinyUrlMData.originalUrl : '';
  }

  async setInfo(info: IInfo) {
    return await this.tinyUrlDao.create(info);
  }
}
