const sequelize = require('../config/connection');
const { Player, Inventory, Item } = require('../models');

const playerData = require('./playerData.json');
const inventoryData = require('./inventoryData.json');
const itemData = require('./itemData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const player = await Player.bulkCreate(playerData);

  const inventory = await Inventory.bulkCreate(inventoryData);

  const item = await Item.bulkCreate(itemData);


  process.exit(0);
};

seedDatabase();
