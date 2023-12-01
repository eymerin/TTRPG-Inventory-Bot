const { REST, Routes } = require('discord.js'); // Import necessary Discord.js modules
require('dotenv').config(); // Load environment variables from .env file
const fs = require('fs'); // File system module for reading files
const path = require('path'); // Module for working with file and directory paths

const commands = []; // Array to store commands

// Define the path to the commands folder
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath); // Read all folders within the commands directory

// Loop through each folder to load commands
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // Filter JavaScript files from the folder

  // Grab the toJSON output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Check if the command has required properties
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON()); // Store the toJSON output of command data in the commands array
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

// Construct an instance of the REST module and set the bot's token
const rest = new REST().setToken(process.env.TOKEN);

// Deploy application (/) commands
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // Use the put method to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // Catch and log any errors that occur during deployment
    console.error(error);
  }
})();