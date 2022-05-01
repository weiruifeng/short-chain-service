import { Context, Controller } from 'egg';
import { IParamTinyUrl, IParamUrl, ITinyUrl } from 'interface';
import { redirect, response, validate } from '../decorator';
import { ParamValidateError } from '../error';
import TinyUrlService from '../service/tiny-url';
import { getDate } from '../utils';
import { URL_PTEFIX } from '../utils/constants';

export default class TinyUrlController extends Controller {

  tinyUrlService: TinyUrlService;

  constructor(ctx: Context) {
    super(ctx);
    this.tinyUrlService = this.service.tinyUrl;
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
    const originalUrl = await this.tinyUrlService.getOriginalUrl(params.url);
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
    const tinyUrl = await this.tinyUrlService.generatorTinyUrl();
    const date = getDate(params.expire);

    await this.tinyUrlService.setInfo({
      tinyUrl,
      originalUrl: params.originalUrl,
      creator: params.creator,
      createDate: date.createDate,
      expireDate: date.expireDate,
    });
    return { url: URL_PTEFIX + tinyUrl };
  }
}
