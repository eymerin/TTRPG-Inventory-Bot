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


Inventory.hasMany(Item, {
  foreignKey: 'inventory_id',
  onDelete: 'CASCADE',
});

Item.belongsTo(Inventory, {
  foreignKey: 'inventory_id',
});

module.exports = { Player, Inventory, Item };
