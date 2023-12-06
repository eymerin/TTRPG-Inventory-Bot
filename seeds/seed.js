const sequelize = require('../config/connections');
const seedPlayer = require('../seeds/playerData');
const seedInventory = require('../seeds/inventoryData');
const seedItem = require('../seeds/itemData');


const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await seedPlayer();

    await seedInventory();

    await seedItem();

    await

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedDatabase();
