const { SlashCommandBuilder } = require('discord.js'); // Import the SlashCommandBuilder from Discord.js
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    // Define the command data using SlashCommandBuilder
    data: new SlashCommandBuilder()
      .setName('createitem') // command name to createitem
      .setDescription('Creates an item'), // command description
  
    // Execute function that runs when the command is invoked
    async execute(interaction) {
        const modal = new ModalBuilder()
			.setCustomId('createItem')
			.setTitle('Create Item');

		// Create the text input components
		const itemNameInput = new TextInputBuilder()
			.setCustomId('itemNameInput')
		    // The label is the prompt the user sees for this input
			.setLabel("What's the name of the Item?")
		    // Short means only a single line of text
            .setRequired(true)
			.setStyle(TextInputStyle.Short);
            

		const itemDescInput = new TextInputBuilder()
			.setCustomId('itemDescInput')
			.setLabel("What is the description of the item?")
            .setRequired(true)
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);

		// An action row only holds one text input,
		// so you need one action row per input.
		const firstActionRow = new ActionRowBuilder().addComponents(itemNameInput);
		const secondActionRow = new ActionRowBuilder().addComponents(itemDescInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow);

		// Show the modal to the user
        // await interaction.reply('Creating an item...');
		await interaction.showModal(modal);
	},
};
