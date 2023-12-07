const { SlashCommandBuilder } = require('discord.js'); 

module.exports = {
  // Define the command data using SlashCommandBuilder
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user.'), 

  // Execute function that runs when the command is invoked
  async execute(interaction) {
    // interaction.user represents the user who initiated the command
    // interaction.member represents the user's information in the specific guild where the command was used

    // Reply to the interaction with user information
    await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
  },
};
