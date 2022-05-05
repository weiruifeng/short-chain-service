import { Model, DataTypes, Optional } from 'sequelize';
import { Application } from 'egg';
import { TStatus } from 'interface';

export interface UrlMapAttr {
  id: number;
  tinyUrl: string;
  originalUrl: string;
  creator: string;
  createDate: number;
  expireDate: number;
  status: TStatus;
}

export interface UrlMapCreationAttr extends Optional<UrlMapAttr, 'id' | 'status'> { }
export interface UrlMapModel extends
  Model<UrlMapAttr, UrlMapCreationAttr>,
  UrlMapAttr { }

export default (app: Application) => {
  const { model } = app;

  const ModelInstance = model.define<UrlMapModel, UrlMapCreationAttr>(
    'url_mapping',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      tinyUrl: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true,
      },
      originalUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      creator: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      expireDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT(),
        allowNull: false,
        defaultValue: 0,
      },
    },
  );

  return ModelInstance;
};
