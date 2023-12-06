const { SlashCommandBuilder } = require('discord.js'); // Import the SlashCommandBuilder from Discord.js

module.exports = {
  // Define the command data using SlashCommandBuilder
  data: new SlashCommandBuilder()
    .setName('openinv') // Set the command name
    .setDescription('Replies with a link to the login page to open players inventory!'), // Set the command description

  // Execute function that runs when the command is invoked
  async execute(interaction) {
    // Reply to the interaction with 'You can access your inventory here: www.linkhere.com'
    await interaction.reply('You can access your inventory here: www.linkhere.com');
  },
};