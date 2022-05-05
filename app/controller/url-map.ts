import { Context, Controller } from 'egg';
import { IParamTinyUrl, IParamUrl, ITinyUrl } from 'interface';
import { redirect, response, validate } from '../decorator';
import { ParamValidateError } from '../error';
import UrlMapService from '../service/url-map';
import BloomFilterService from '../service/bloom-filter';
import { getDate } from '../utils';
import { URL_PTEFIX } from '../utils/constants';

export default class UrlMapController extends Controller {

  urlMapService: UrlMapService;
  bloomFilter: BloomFilterService;

  constructor(ctx: Context) {
    super(ctx);
    this.urlMapService = this.service.urlMap;
    this.bloomFilter = this.service.bloomFilter;
  }

  @redirect
  @validate('params', {
    url: {
      type: 'string',
      required: true,
      allowEmpty: false,
      format: /^[0-9a-zA-Z]{8}$/,
    },
  })
  async getOriginalUrl({ params }: { params: IParamUrl }): Promise<ITinyUrl> {
    const originalUrl = await this.urlMapService.getOriginalUrl(params.url);
    if (!originalUrl) {
      throw new ParamValidateError('短链无效');
    }
    return { url: originalUrl };
  }

  @response
  @validate('body', {
    originalUrl: 'string',
    creator: 'string',
    expire: 'int?',
  })
  async setInfo({ params }: { params: IParamTinyUrl }): Promise<IParamUrl> {
    const bloomFlag = this.service.bloomFilter.has(params.originalUrl);
    if (bloomFlag) {
      throw new ParamValidateError('url已存在');
    }
    const tinyUrl = await this.urlMapService.generatorTinyUrl();
    const date = getDate(params.expire);

    await this.urlMapService.setInfo({
      tinyUrl,
      originalUrl: params.originalUrl,
      creator: params.creator,
      createDate: date.createDate,
      expireDate: date.expireDate,
    });
    return { url: URL_PTEFIX + tinyUrl };
  }
}
