const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, SlashCommandBuilder, ComponentType } = require('discord.js');
const { Item, Player } = require('../../../models/index');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('senditem')
    .setDescription('Send item to player!'),
  async execute(interaction) {
    try {
      // Fetch items from the database
      const items = await Item.findAll();
      const itemOptions = items.map((item) =>
        new StringSelectMenuOptionBuilder()
          .setLabel(item.item_name)
          .setValue(item.item_id.toString())
      );

      // Fetch players from the database
      const players = await Player.findAll();
      const playerOptions = players.map((player) =>
        new StringSelectMenuOptionBuilder()
          .setLabel(player.name)
          .setValue(player.player_id.toString())
      );

      const initialMenu = new StringSelectMenuBuilder()
        .setCustomId('initialSelect')
        .setPlaceholder('Select an item')
        .addOptions(itemOptions);

      const initialRow = new ActionRowBuilder().addComponents(initialMenu);

      await interaction.reply({
        content: 'Please select an item:',
        components: [initialRow],
      });

      const initialCollector = interaction.channel.createMessageComponentCollector({
        componentType: ComponentType.SELECT_MENU,
        time: 60000,
      });

      initialCollector.on('collect', async (initialInteraction) => {
        if (initialInteraction.customId === 'initialSelect') {
          const selectedItemId = initialInteraction.values[0];

          const playerMenu = new StringSelectMenuBuilder()
            .setCustomId('playerSelect')
            .setPlaceholder('Select a player')
            .addOptions(playerOptions);

          const playerRow = new ActionRowBuilder().addComponents(playerMenu);

          await initialInteraction.update({
            content: 'Please select a player:',
            components: [playerRow],
          });

          const playerCollector = interaction.channel.createMessageComponentCollector({
            componentType: ComponentType.SELECT_MENU,
            time: 60000,
          });

          playerCollector.on('collect', async (playerInteraction) => {
            if (playerInteraction.customId === 'playerSelect') {
              const selectedPlayerId = playerInteraction.values[0];

              // Retrieve the selected item and player information from the IDs
              const selectedItem = items.find((item) => item.item_id.toString() === selectedItemId);
              const selectedPlayer = players.find((player) => player.player_id.toString() === selectedPlayerId);

              await playerInteraction.update({
                content: `Item '${selectedItem.item_name}' has been sent to player '${selectedPlayer.name}'.`,
                components: [], // Remove components
              });

              // Log collected info
              console.log(`Selected item: ${selectedItem.item_name}`);
              console.log(`Sent to player: ${selectedPlayer.name}`);
              // Handle the selected player or store the data as needed in the database
            }
          });

          playerCollector.on('end', () => {
            console.log('Player collector ended');
          });
        }
      });

      initialCollector.on('end', () => {
        console.log('Initial collector ended');
      });
    } catch (error) {
      console.error('Error fetching data from the database:', error);
      // Handle error, send a message, or perform error logging as needed
    }
  },
};