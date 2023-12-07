const { SlashCommandBuilder } = require('discord.js'); // Import the SlashCommandBuilder from Discord.js

module.exports = {
  // Define the command data using SlashCommandBuilder
  data: new SlashCommandBuilder()
    .setName('openinv') 
    .setDescription('Replies with a link to the login page to open players inventory!'),

  // Execute function that runs when the command is invoked
  async execute(interaction) {
    await interaction.reply('You can access your inventory here: www.linkhere.com');
  },
};