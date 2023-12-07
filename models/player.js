const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connections');

class Player extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Player.init(
  {
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newPlayerData) => {
        newPlayerData.password = await bcrypt.hash(newPlayerData.password, 10);
        return newPlayerData;
      },
      beforeUpdate: async (updatedPlayerData) => {
        updatedPlayerData.password = await bcrypt.hash(updatedPlayerData.password, 10);
        return updatedPlayerData;
      },
      afterCreate: async (createdPlayer) => {
        try {
          const Inventory = require('./inventory');
          await Inventory.create({
            inventory_name: `${createdPlayer.name}'s Inventory`,
            player_id: createdPlayer.player_id,
          });
        } catch (error) {
          console.error('Error creating inventory for player:', error);
        }
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'player',
  }
);

module.exports = Player;
