import { Controller } from 'egg';
import { ITinyUrl } from 'interface';
import { response } from '../decorator';

export default class TinyUrlController extends Controller {
  @response
  async getUrl(): Promise<ITinyUrl> {
    return {};
  }

  @response
  async setUrl(): Promise<ITinyUrl> {
    return {};
  }
}
