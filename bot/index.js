// Require necessary modules
const fs = require('fs'); // File system module for reading files
const { Client, Collection, GatewayIntentBits, Events, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js'); // Discord.js modules for bot functionality
require('dotenv').config(); // Load environment variables from .env file
const path = require('path'); // Module for working with file and directory paths
const { Item, Player, Inventory } = require('../models/index'); // Import the models in the DB.

// Create a new Discord bot client
const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // Define bot intents for events

// Collection to store bot commands
client.commands = new Collection();

// Define the path to the commands folder
const foldersPath = path.join(__dirname, 'commands');

// Read all folders within the commands directory
const commandFolders = fs.readdirSync(foldersPath);

// Loop through each folder to load commands
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  
  // Filter and retrieve JavaScript files from the folder
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  // Load each command file
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Check if the command has required properties
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command); // Store the command in the collection
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
};

//Connecting the bot to the database
const db = require('../config/connections');
// Event handler for when the bot is ready
client.once('ready', async() => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  db.authenticate()
    .then(() => {
      console.log('Logged into Database!');
    })
    .catch(err => console.log(err));
});

// Event handler for interaction (slash commands)
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return; // Check if it's a slash command

  // Retrieve the command based on the command name
  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction); // Execute the command
  } catch (error) {
    console.error(error);
    // Respond with an error message if command execution fails
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

//Modal Code Below

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId === 'createItem') {
    const itemName = interaction.fields.getTextInputValue('itemNameInput');
    const itemDesc = interaction.fields.getTextInputValue('itemDescInput');
    console.log({ itemName, itemDesc });

    try {
      // Insert item into the database using Sequelize
      const newItem = await Item.create({
        item_name: itemName,
        item_description: itemDesc,
      });

      console.log('Item added to database successfully:', newItem.toJSON());
      await interaction.reply({ content: 'Your item submission was received successfully!' });
    } catch (error) {
      console.error('Error adding item to database:', error);
      await interaction.reply({ content: 'Failed to add the item to the database.' });
    }
  }
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isModalSubmit()) return;
  if (interaction.customId === 'createPlayer') {
	// Get the data entered by the user
	const playerName = interaction.fields.getTextInputValue('playerNameInput');
	const playerUser = interaction.fields.getTextInputValue('playerUser');
  const playerPass = interaction.fields.getTextInputValue('playerPass');
	console.log({ playerName, playerUser, playerPass });

  //This is where we will want to place logic to use information from the modal for the database.
	await interaction.reply({ content: `Your palyer details were collected successfully, and ${playerName} has been added!` });
	}
});

// Log in to Discord with the bot's token
client.login(process.env.TOKEN);

// command to open inventory, provide link to the site to login to see inventory.
// look into logic to make commands role specific - have bot create role with player and add to a user in discord?