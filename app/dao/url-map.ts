import { BaseContextClass, Context } from 'egg';
import { ModelStatic, WhereOptions, Op } from 'sequelize';
import { UrlMapAttr, UrlMapCreationAttr, UrlMapModel } from '../model/url-map';
import { trace } from '../utils/decorator';
import { UrlMapStateEnum } from '../utils/enum';

export default class UrlMapDao extends BaseContextClass {
  model: ModelStatic<UrlMapModel>;

  constructor(ctx: Context) {
    super(ctx);
    this.model = ctx.model.UrlMap;
  }

  @trace
  async getMCount(): Promise<number> {
    return await this.model.count();
  }

  @trace
  async getMMaxId(): Promise<number> {
    return await this.model.max('id');
  }

  @trace
  async getMDataById(id: number): Promise<UrlMapModel | null> {
    return await this.model.findByPk(id);
  }

  @trace
  async getOneMData(option: WhereOptions<UrlMapAttr>): Promise<UrlMapModel | null> {
    return await this.model.findOne({
      where: option,
    });
  }

  @trace
  async getMDatas(whereOption: WhereOptions<UrlMapAttr>): Promise<UrlMapModel[]> {
    return await this.model.findAll({
      where: whereOption,
      order: [['id', 'DESC']],
    });
  }

  @trace
  async getExpiredMDatas(): Promise<UrlMapModel[]> {
    return await this.getMDatas({
      state: UrlMapStateEnum.Normal,
      expireDate: {
        [Op.lt]: new Date(),
      },
    });
  }

  @trace
  async create(option: UrlMapCreationAttr): Promise<UrlMapModel> {
    return await this.model.create(option);
  }

  @trace
  async updateDataById(id: number | number[], option: Partial<UrlMapAttr>) {
    return await this.model.update(option, {
      where: { id },
    });
  }

  @trace
  async destroy(option: WhereOptions<UrlMapAttr>): Promise<number> {
    return await this.model.destroy({
      where: option,
    });
  }
}
