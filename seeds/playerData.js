const { Player } = require('../models');

playerdata = [
    {
      name: "Yttani",
      user: "user1",
      password: "password12345"
    },
    {
      name: "Eymerin",
      user: "user2",
      password: "password12345"
    },
    {
      name: "player3",
      user: "user3",
      password: "password12345"
    },
    {
      name: "player4",
      user: "user4",
      password: "password12345"
    },
    {
      name: "player5",
      user: "user5",
      password: "password12345"
    }
    
];

const seedPlayer = () => Player.bulkCreate(playerdata);

module.exports = seedPlayer;

  