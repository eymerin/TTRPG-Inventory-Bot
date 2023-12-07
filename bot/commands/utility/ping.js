const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  // Define the command data using SlashCommandBuilder
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with I heard you, Pong!'),

  // Execute function that runs when the command is invoked
  async execute(interaction) {
    await interaction.reply('I heard you, Pong!');
  },
};

