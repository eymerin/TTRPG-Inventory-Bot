const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Item extends Model {}

Item.init(
  {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    item_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    inventory_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'inventory',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'item',
  }
);

module.exports = Item;
