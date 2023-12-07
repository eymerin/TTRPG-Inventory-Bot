const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');
const { Item, Player } = require('../../../models/index'); // Import Item model

module.exports = {
  // Define the command data using SlashCommandBuilder
    data: new SlashCommandBuilder()
      .setName('senditem') // command name to createitem
      .setDescription('Select an Item to send'), // command description

    async execute(interaction) {
        try {
            // Fetch item data from the database
            const items = await Item.findAll();
            const players = await Player.findAll();
      
            // Create a StringSelectMenuBuilder for items
            const itemSelectMenu = new StringSelectMenuBuilder()
                .setCustomId('itemSelection')
                .setPlaceholder('Select an item to send');
      
            // Generate select menu options for items based on item data
            items.forEach((item) => {
                itemSelectMenu.addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel(item.item_name) // Set label as item name or a relevant field
                        .setDescription(item.item_description) // Set description as item description or a relevant field
                        .setValue(item.item_id.toString()) // Set value as a unique identifier for the item
                        );
                    });
      
            // Create an ActionRow and add the item select menu
            const itemActionRow = new ActionRowBuilder().addComponents(itemSelectMenu);
      
            const playerSelectMenu = new StringSelectMenuBuilder()
                .setCustomId('playerSelection')
                .setPlaceholder('Choose a player to send to');
      
            players.forEach((player) => {
                playerSelectMenu.addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel(player.name)
                        .setValue(player.name.toString())
                        );
                    });
      
            const playerActionRow = new ActionRowBuilder().addComponents(playerSelectMenu);
      
            // Send the item select menu in an interaction reply
            await interaction.reply(
                {
                content: 'Please select an item to send, and the player to send it to:',
                components: [itemActionRow, playerActionRow],
                }
            );
        } catch (error) {
            console.error('Error executing command:', error);
            // Handle the error accordingly, e.g., sending an error message or logging it.
        }
    }
};