const { Player } = require('../models');

playerdata = [
    {
      name: "Yttani",
      username: "user1",
      password: "password12345"
    },
    {
      name: "Eymerin",
      username: "user2",
      password: "password12345"
    },
    {
      name: "player3",
      username: "user3",
      password: "password12345"
    },
    {
      name: "player4",
      username: "user4",
      password: "password12345"
    },
    {
      name: "player5",
      username: "user5",
      password: "password12345"
    }
    
];

const seedPlayer = () => Player.bulkCreate(playerdata);

module.exports = seedPlayer;

  