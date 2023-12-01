const { SlashCommandBuilder } = require('discord.js'); // Import the SlashCommandBuilder from Discord.js

module.exports = {
  // Define the command data using SlashCommandBuilder
  data: new SlashCommandBuilder()
    .setName('server') // Set the command name
    .setDescription('Provides information about the server.'), // Set the command description

  // Execute function that runs when the command is invoked
  async execute(interaction) {
    // interaction.guild represents the Guild where the command was used

    // Reply to the interaction with server information
    await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
  },
};
