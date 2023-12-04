const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Inventory extends Model {}

Inventory.init(
  {
    inventory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    inventory_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    player_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'player',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'inventory',
  }
);

module.exports = Inventory;