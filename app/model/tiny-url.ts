import { Model, DataTypes, Optional } from 'sequelize';
import { Application } from 'egg';

export interface TinyUrlAttr {
  id: number;
  tinyUrl: string;
  originalUrl: string;
}

export interface TinyUrlCreationAttr extends Optional<TinyUrlAttr, 'id'> { }
export interface TinyUrlModel extends
  Model<TinyUrlAttr, TinyUrlCreationAttr>,
  TinyUrlAttr { }

export default (app: Application) => {
  const { model } = app;

  const ModelInstance = model.define<TinyUrlModel, TinyUrlCreationAttr>(
    'tiny_url',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      tinyUrl: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      originalUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      underscored: true,
    },
  );

  return ModelInstance;
};
