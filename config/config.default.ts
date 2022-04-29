const fs = require('fs');
const path = require('path');
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo): any => {
  const config = {
    middleware: [
      'errorHandler',
      'visitor',
    ],
    static: {
      prefix: '/public/',
      dir: path.join(appInfo.baseDir, 'public'),
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    session: {
      key: 'MAPI_SESSION',
      maxAge: 24 * 3600 * 1000,
      httpOnly: true,
      encrypt: true,
    },
    siteFile: {
      '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'icon', 'favicon.ico')),
    },
    customLoader: {
      dao: {
        directory: 'app/dao',
        // 如果是 ctx 则使用 loadToContext
        inject: 'ctx',
        // 是否加载框架和插件的目录
        loadunit: false,
      },
    },
  };

  const bizConfig = {
    sequelize: {
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
      logging: true,
      define: {
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
      },
      timezone: '+08:00',
    },
    visitor: {
      include: [],
      exclude: [
        // 健康检查
        '/monitor/alive',
      ],
    },
  };


  return {
    ...config,
    ...bizConfig,
  } as PowerPartial<EggAppConfig>;
};
