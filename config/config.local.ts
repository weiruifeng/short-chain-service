import { EggAppConfig, PowerPartial } from 'egg';
import database from './database';

export default (): any => {
  const config = {};

  const bizConfig = {
    sequelize: database.development,
  };

  return {
    ...config,
    ...bizConfig,
  } as PowerPartial<EggAppConfig>;
};
