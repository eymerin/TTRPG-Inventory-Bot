const sequelize = require('../config/connections');
const { Player, Inventory, Item } = require('../models');

const playerData = require('./playerData.json');
const inventoryData = require('./inventoryData.json');
const itemData = require('./itemData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const players = await Player.bulkCreate(playerData);
    const inventories = await Inventory.bulkCreate(inventoryData);
    const items = await Item.bulkCreate(itemData);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedDatabase();
