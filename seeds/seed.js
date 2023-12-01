const sequelize = require('../config/connection');
const { Player, Inventory } = require('../models');

const playerData = require('./playerData.json');
const inventoryData = require('./inventoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const players = await User.bulkCreate(playerData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
