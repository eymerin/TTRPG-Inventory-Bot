// Require necessary modules
const fs = require('fs'); // File system module for reading files
const { Client, Collection, GatewayIntentBits } = require('discord.js'); // Discord.js modules for bot functionality
require('dotenv').config(); // Load environment variables from .env file
const path = require('path'); // Module for working with file and directory paths

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

// Event handler for when the bot is ready
client.once('ready', () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
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

// Log in to Discord with the bot's token
client.login(process.env.TOKEN);