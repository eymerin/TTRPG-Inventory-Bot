const { SlashCommandBuilder } = require('discord.js'); // Import the SlashCommandBuilder from Discord.js

module.exports = {
  // Define the command data using SlashCommandBuilder
  data: new SlashCommandBuilder()
    .setName('ping') // Set the command name
    .setDescription('Replies with I heard you, Pong!'), // Set the command description

  // Execute function that runs when the command is invoked
  async execute(interaction) {
    // Reply to the interaction with 'I heard you, Pong!'
    await interaction.reply('I heard you, Pong!');
  },
};

