// Require necessary modules
const fs = require('fs');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js'); // Discord.js modules for bot functionality
require('dotenv').config();
const path = require('path');
const db = require('../config/connections'); //Connecting the bot to the database
const { Item, Player, Inventory } = require('../models/index'); // Import the models in the DB.


// Create a new Discord bot client and define intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Collection to store bot commands
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Loop through each folder to load commands
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
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
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

//Event Listener for createitem command
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


//Event Listener for createplayer command
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isModalSubmit()) return;
  if (interaction.customId === 'createPlayer') {
	const playerName = interaction.fields.getTextInputValue('playerNameInput');
	const playerUsername = interaction.fields.getTextInputValue('playerUsername');
  const playerPass = interaction.fields.getTextInputValue('playerPass');
	console.log({ playerName, playerUsername, playerPass });

  try {
    // Insert player into the database using Sequelize
    const newPlayer = await Player.create({
      name: playerName,
      username: playerUsername,
      password: playerPass,
    });

    console.log('Player added to database successfully:', newPlayer.toJSON());
    await interaction.reply({ content: `Your player details were collected successfully, and ${playerName} has been added! Additionally, an inventory has been created for them!` });
  } catch (error) {
    console.error('Error adding player to database:', error);
    await interaction.reply({ content: 'Failed to add the player to the database.' });
  }
}
});

// Log in to Discord with the bot's token
client.login(process.env.TOKEN);