import { Model, DataTypes, Optional } from 'sequelize';
import { Application } from 'egg';

export interface TinyUrlAttr {
  id: number;
  tinyUrl: string;
  originalUrl: string;
  creator: string;
  createDate: number;
  expireDate: number;
}

export interface TinyUrlCreationAttr extends Optional<TinyUrlAttr, 'id'> { }
export interface TinyUrlModel extends
  Model<TinyUrlAttr, TinyUrlCreationAttr>,
  TinyUrlAttr { }

export default (app: Application) => {
  const { model } = app;

  const ModelInstance = model.define<TinyUrlModel, TinyUrlCreationAttr>(
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
    },
  );

  return ModelInstance;
};
