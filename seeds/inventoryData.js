const { Inventory } = require('../models');

const inventorydata = [
    {
        inventory_name: "Yttani Inventory"
    },
    {
        inventory_name: "Eymerin Inventory",
        player_id: 1
    },
    {
        inventory_name: "Player3 Inventory"
    },
    {
        inventory_name: "Player4 Inventory"
    },
    {
        inventory_name: "Player5 Inventory"
    }
];

const seedInventory = () => Inventory.bulkCreate(inventorydata);

module.exports = seedInventory;

