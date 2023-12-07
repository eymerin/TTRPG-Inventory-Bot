const { Item } = require('../models');

const itemdata = [
    {
        item_name: "Dagger",
        item_description: "+3 ATK",
        inventory_id: 1
    },
    {
        item_name: "Red Potion",
        item_description: "Recover 20% HP"
    },
    {
        item_name: "Mana Potion",
        item_description: "Recover 20% Mana"
    }

];


const seedItem = () => Item.bulkCreate(itemdata);

module.exports = seedItem;
