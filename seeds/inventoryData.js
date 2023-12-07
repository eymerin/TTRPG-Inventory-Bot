const { Inventory } = require('../models');

const inventorydata = [
    {
        inventory_name: "Yttani Inventory",
        player_id: 1
    },
    {
        inventory_name: "Eymerin Inventory",
        player_id: 2
    },
    {
        inventory_name: "Player3 Inventory",
        player_id: 3
    },
    {
        inventory_name: "Player4 Inventory",
        player_id: 4
    },
    {
        inventory_name: "Player5 Inventory",
        player_id: 5
    }
];

const seedInventory = () => Inventory.bulkCreate(inventorydata);

module.exports = seedInventory;

