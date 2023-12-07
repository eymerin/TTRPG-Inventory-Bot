const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, SlashCommandBuilder, ComponentType } = require('discord.js');
const { Item, Player } = require('../../../models/index');

module.exports = {
  // Define the command data using SlashCommandBuilder
    data: new SlashCommandBuilder()
      .setName('senditem')
      .setDescription('Select an Item to send'),

    async execute(interaction) {
            // Initialize session data for the interaction
            interaction.sessionData = {
            selectedItem: null
            };
            
            const items = await Item.findAll();
            const players = await Player.findAll();
      
            // Create a StringSelectMenuBuilder for items
            const itemSelectMenu = new StringSelectMenuBuilder()
                .setCustomId('itemSelection')
                .setPlaceholder('Select an item to send')
                .setMaxValues(1);
                
      
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
            const reply = await interaction.reply(
                {
                content: 'Please select an item to send, and the player to send it to:',
                components: [itemActionRow, playerActionRow],
                }
            );

            const collector = reply.createMessageComponentCollector({
                ComponentType: ComponentType.StringSelect,
                filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
                time: 60_000,
            });

            collector.on('collect', (interaction) => {
                console.log(interaction.values);
            })
    }
};