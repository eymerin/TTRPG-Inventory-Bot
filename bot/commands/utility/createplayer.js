const { SlashCommandBuilder } = require('discord.js'); // Import the SlashCommandBuilder from Discord.js
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    // Define the command data using SlashCommandBuilder
    data: new SlashCommandBuilder()
      .setName('createplayer') // command name to createitem
      .setDescription('Creates A player and sets login info for the player'), // command description
  
    // Execute function that runs when the command is invoked
    async execute(interaction) {
        const modal = new ModalBuilder()
			.setCustomId('createPlayer')
			.setTitle('Create A Player');

		// Create the text input components
		const playerNameInput = new TextInputBuilder()
			.setCustomId('playerNameInput')
		    // The label is the prompt the user sees for this input
			.setLabel("What's the name of the player?")
		    // Short means only a single line of text
            .setRequired(true)
			.setStyle(TextInputStyle.Short);
            
		const playerUserInput = new TextInputBuilder()
			.setCustomId('playerUser')
			.setLabel("Set a login username for this player.")
            .setRequired(true)
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Short);

        const playerPassInput = new TextInputBuilder()
			.setCustomId('playerPass')
			.setLabel("Set a password for this players login.")
            .setRequired(true)
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Short);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(playerNameInput);
		const secondActionRow = new ActionRowBuilder().addComponents(playerUserInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(playerPassInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

		// Show the modal to the user
        // await interaction.reply('Creating an item...');
		await interaction.showModal(modal);
	},
};