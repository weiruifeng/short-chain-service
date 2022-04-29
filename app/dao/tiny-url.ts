import { BaseContextClass, Context } from 'egg';
import { ModelStatic, WhereOptions } from 'sequelize';
import { TinyUrlAttr, TinyUrlCreationAttr, TinyUrlModel } from '../model/tiny-url';

export default class ResourceCinemaDao extends BaseContextClass {
  model: ModelStatic<TinyUrlModel>;

  constructor(ctx: Context) {
    super(ctx);
    this.model = ctx.model.TicketModel.ApplyCinema;
  }

  async getMDataById(id: number): Promise<TinyUrlModel | null> {
    return await this.model.findByPk(id);
  }

  async getMDatas(whereOption: WhereOptions<TinyUrlAttr>): Promise<TinyUrlModel[]> {
    return await this.model.findAll({
      where: whereOption,
      order: [['id', 'DESC']],
    });
  }

  async create(option: TinyUrlCreationAttr): Promise<TinyUrlModel> {
    return await this.model.create(option);
  }

  async updateDataById(id: number, option: Partial<TinyUrlAttr>) {
    return await this.model.update(option, {
      where: { id },
    });
  }

  async destroy(option: WhereOptions<TinyUrlAttr>): Promise<number> {
    return await this.model.destroy({
      where: option,
    });
  }
}
