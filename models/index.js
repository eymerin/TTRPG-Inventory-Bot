const Player = require('./player');
const Inventory = require('./inventory');
const Item = require('./item');

Player.hasOne(Inventory, {
  foreignKey: 'player_id',
  onDelete: 'CASCADE',
});

Inventory.belongsTo(Player, {
  foreignKey: 'player_id',
});


Player.hasMany(Item, {
    foreignKey: 'player_id',
  onDelete: 'CASCADE',
});

Item.belongsTo(Player, {
  foreignKey: 'player_id',
});

module.exports = { Player, Inventory, Item };
